import React, { useState, useEffect } from "react";

import BrowseItems from "../Items/BrowseItems.js";
import { useUser } from "../../context/UserContext.js";
import SessionService from "../../services/SessionService.js";
import SessionRepository from "../../repository/SessionRepository.js";
const BrowseSessions = () => {
  const [sessions, setSessions] = useState();
  const { user } = useUser();
  const sessionRepository = new SessionRepository();
  const sessionService = new SessionService(sessionRepository);

  // const role_id = user ? user.role_id : [];

  //role_id =1 -> admin
  //role_id =2 -> student

  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role_id === 2) {
          console.log(user.user_id);
          const userSessions = await sessionService.getSessionByStudentId(
            user.user_id
          );

          console.log("Before setting sessions:", sessions);
          setSessions(userSessions);
        } else if (user.role_id === 1) {
          const allSessions = await sessionService.getSessions();
          setSessions(allSessions);
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchData();
  }, []);

  console.log("After setting sessions:", sessions); // Log after setting

  return sessions ? <BrowseItems items={sessions} /> : null;
};

export default BrowseSessions;
