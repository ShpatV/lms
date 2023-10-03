export default class HttpResponse {
  static sendSuccess(res, data = null, statusCode = 200) {
    res.status(statusCode).json({ success: true, data });
  }

  static sendError(res, error, statusCode = 500) {
    res.status(statusCode).json({ success: false, error: error.message });
  }
  static sendNotFound(res, msg) {
    res.status(404).json({
      status: 404,
      statusText: "Not Found",
      error: {
        message: msg,
      },
    });
  }
  static sendBadRequest(res, msg) {
    res.status(400).json({
      status: 400,
      statusText: "Bad Request",
      error: {
        message: msg,
      },
    });
  }
}
