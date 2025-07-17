const Session = require("../models/Session.js");
const Question = require("../models/Question.js");

//create new session , /api/sessions/create

exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.user._id;

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );
    session.questions = questionDocs;
    await session.save();

    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error(error); // This will print the real error in your backend console
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all sessions of a user
///api/sessions/my-sessions

exports.getMySessions = async (req, res) => {
  try {
    const session = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

//get session by id

exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      return res
        .status(404)
        .json({ success: false, messgae: "Session not found!" });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

//delete a session

exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found!" });
    }

    //check if logged in user owns this session
    if (session.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this session!" });
    }

    await Question.deleteMany({ session: session._id });

    await session.deleteOne();

    res.status(200).json({ message: "Session deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};
