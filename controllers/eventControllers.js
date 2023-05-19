const asyncHandler = require("express-async-handler");
const Event = require("../model/eventModel");

const getEvents = asyncHandler(async (req, res) => {
  const eventId = req.query.id;
  if (eventId) {
    try {
      const event = await Event.findById(eventId);
      res.status(200).send({
        ...event._doc,
        schedule: event.schedule.toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
      });
    } catch (error) {
      res.status(400).send(error.message);
      throw new Error(error.message);
    }
  } else {
    const { type, limit, page } = req.query;
    try {
      if (type == "latest") {
        const events = await Event.find({})
          .sort({ schedule: 1 })
          .skip((parseInt(page) - 1) * parseInt(limit))
          .limit(parseInt(limit));
        res.status(200).send(
          events.map((event) => ({
            ...event._doc,
            schedule: event.schedule.toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            }),
          }))
        );
      }
    } catch (error) {
      res.status(400).send(error.message);
      throw new Error(error.message);
    }
  }
});

const createEvent = asyncHandler(async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      schedule: Date.parse(req.body.schedule),
    });
    res.status(201).send({
      ...event._doc,
      schedule: event.schedule.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    });
  } catch (error) {
    res.status(400).send(error.message);
    throw new Error(error.message);
  }
});

const updateEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        ...req.body,
        schedule: Date.parse(req.body.schedule),
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      ...event._doc,
      schedule: event.schedule.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    });
  } catch (error) {
    res.status(400).send(error.message);
    throw new Error(error.message);
  }
});

const deleteEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  try {
    await Event.findByIdAndDelete(eventId);
    res.status(200).send("Event deleted");
  } catch (error) {
    res.status(400).send(error.message);
    throw new Error(error.message);
  }
});

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
