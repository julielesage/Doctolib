const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const Booking = require("./models/Booking");

const server = express();
server.use(formidableMiddleware());
mongoose.connect("mongodb://localhost/doctolib", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const isToday = require("date-fns/isToday");
isToday(new Date());
const compareAsc = require("date-fns/compareAsc");
const getDay = require("date-fns/getDay");

/* ONE DATE */
server.get("/visits", async (req, res) => {
  try {
    if (req.query.date) {
      const booking = await Booking.findOne({ date: req.query.date });
      if (booking) {
        res.status(200).send(booking);
      } else {
        const newBooking = new Booking({
          date: req.query.date,
          slots: {
            "1000": {
              name: "",
              isAvailable: true
            },
            "1030": {
              name: "",
              isAvailable: true
            },
            "1100": {
              name: "",
              isAvailable: true
            },
            "1130": {
              name: "",
              isAvailable: true
            },
            "1400": {
              name: "",
              isAvailable: true
            },
            "1430": {
              name: "",
              isAvailable: true
            },
            "1500": {
              name: "",
              isAvailable: true
            },
            "1530": {
              name: "",
              isAvailable: true
            },
            "1600": {
              name: "",
              isAvailable: true
            },
            "1630": {
              name: "",
              isAvailable: true
            },
            "1700": {
              name: "",
              isAvailable: true
            },
            "1730": {
              name: "",
              isAvailable: true
            }
          }
        });
        await newBooking.save();
        res.status(200).send(newBooking);
      }
    } else {
      res.json("missing date");
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

/* ONE SLOT */
server.post("/visits", async (req, res) => {
  try {
    if (!req.query.date) {
      res.json("missing date");
    } else {
      const today = new Date();
      const bookingDate = new Date(req.query.date);
      const result = compareAsc(bookingDate, today);
      if (result === -1) {
        res.json({ message: "cette date est déjà passée" });
      } else {
        if (getDay(bookingDate) === 0) {
          res.json({ message: "sorry, this doctor doesn't work on sundays" });
        } else {
          const booking = await Booking.findOne({ date: req.query.date });
          console.log(booking);
          if (booking.slots[req.fields.slot]) {
            if (booking.slots[req.fields.slot].isAvailable === false) {
              res.json({ message: "sorry, this slot is not available" });
            } else {
              (booking.slots[req.fields.slot].isAvailable = false),
                (booking.slots[req.fields.slot].name = req.fields.name),
                await booking.save();
              res.status(200).send("your appointement has been booked");
            }
          } else {
            res.status(200).send("the doctor does not work at this hour");
          }
        }
      }
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/* DELETE ONE SLOT */
server.delete("/visits/delete", async (req, res) => {
  try {
    if (req.query.date) {
      if (!req.fields.slot) {
        res.json({ message: "missing slot" });
      } else {
        const bookingDate = await Booking.findOne({ date: req.query.date });
        bookingDate.slots[req.fields.slot].isAvailable = true;
        bookingDate.slots[req.fields.slot].name = "";
        await bookingDate.save();
        res.json("your appointment has been deleted");
      }
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

server.get("/", (req, res) => {
  res.json("Doctolib says Hello !");
});

server.all("*", (req, res) => {
  res.status(404).send("oups, cette page n'existe pas");
});

server.listen(4000, () => {
  console.log("server started");
});
