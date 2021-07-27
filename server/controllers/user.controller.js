export function allAccess(req, res) {
  res.status(200).send("Público");
}

export function userBoard(req, res) {
  res.status(200).send("User Content");
}

export function adminBoard(req, res) {
  res.status(200).send("Admin Only");
}

export function moderatorBoard(req, res) {
  res.status(200).send("Moderator Content");
}
