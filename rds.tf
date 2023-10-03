# configured aws provider with proper credentials
provider "aws" {
  region  = "eu-central-1"
}
# create default vpc if one does not exit
resource "aws_default_vpc" "default_vpc" {
  tags = {
    Name = "default vpc"
  }
}
# use data source to get all avalablility zones in region
data "aws_availability_zones" "available_zones" {}
# create a default subnet in the first az if one does not exit
resource "aws_default_subnet" "first_default_subnet" {
  availability_zone = data.aws_availability_zones.available_zones.names[0]
}
# create a default subnet in the second az if one does not exit
resource "aws_default_subnet" "second_default_subnet" {
  availability_zone = data.aws_availability_zones.available_zones.names[1]
}
# create security group for the web server
resource "aws_security_group" "security_group" {
  name        = "webserver security group"
  description = "enable http access on port 80"
  vpc_id      = aws_default_vpc.default_vpc.id
  ingress {
    description      = "http access"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["35.157.73.216/32"]
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = -1
    cidr_blocks      = ["0.0.0.0/0"]
  }
  tags   = {
    Name = "webserver security group"
  }
}
# create security group for the database
resource "aws_security_group" "db_security_group" {
  name        = "database security group"
  description = "enable postgresql/aurora access on port 5432"
  vpc_id      = aws_default_vpc.default_vpc.id
  ingress {
    description      = "postgresql/aurora access"
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    security_groups  = [aws_security_group.security_group.id]
    cidr_blocks      = ["35.157.73.216/32"]
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = -1
    cidr_blocks      = ["0.0.0.0/0"]
  }
  tags   = {
    Name = "database security group"
  }
}
# create the subnet group for the rds instance
resource "aws_db_subnet_group" "db_subnet_group" {
  name         = "db-subnets"
  subnet_ids   = [aws_default_subnet.first_default_subnet.id, aws_default_subnet.second_default_subnet.id]
  description  = "subnets for db instance created"
  tags   = {
    Name = "db-subnets"
  }
}
# create the rds instance
resource "aws_db_instance" "db_instance_rds" {
  engine                  = "postgres"
  #engine_version          = "12.5"
  multi_az                = false #don't create another database in other availability zones
  identifier              = "dev-rds-apprentice"
  username                = "postgres"
  password                = "mysecretpassword"
  instance_class          = "db.t3.micro"
  allocated_storage       = 200
  db_subnet_group_name    = aws_db_subnet_group.db_subnet_group.name
  vpc_security_group_ids  = [aws_security_group.db_security_group.id]
  availability_zone       = data.aws_availability_zones.available_zones.names[0]
  db_name                 = "apprenticedb"
  skip_final_snapshot     = true
}