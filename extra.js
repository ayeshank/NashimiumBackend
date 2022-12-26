const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const connectDb = require("./config/connectdb.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Cookies = require("js-cookie");
var session = require("express-session");
const path = require("path");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000; // jb 3000 se 5000 kia tha to cannot post ka error login pr hi agaya tha
const DATABASE_URL = process.env.DATABASE_URL;

//BODY PARSER
app.use(bodyParser.json());

//CORS POLICY
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

//DATABASE CONNECTION
connectDb(DATABASE_URL);

//JSON
app.use(express.json());

const Member = require("./schema.js");
const Admin = require("./models/adminSchema");
const xnaLog = require("./models/xnaLogSchema.js");
const referral = require("./models/referralSchema.js");
const buysell = require("./models/buysellSchema.js");
const audLog = require("./models/audLogSchema.js");
const MemberLog = require("./models/membersLog.js");
const companyLog = require("./models/companyLogSchema.js");
const newMember = require("./models/NewMemberSchema.js");
const company = require("./models/companySchema.js");
const MemberFee = require("./models/memberfeeSchema.js");
const refPay = require("./models/ReferralPaymentSchema.js");
const compSet = require("./models/CompSettingSchema.js");
const buysellSet = require("./models/BuySellSettingSchema.js");
const compInpSet = require("./models/compInputSetSchema.js");
const transfer = require("./models/transferSchema.js");
const ForgotPassword = require("./models/forgotPassword.js");
const InviteMember = require("./models/InviteMemberSchema.js");
const PrefCurr = require("./models/prefferedCurrencySchema.js");

// mongoose
//   .connect(
//     "mongodb+srv://ayesha_user-21:757001ank@cluster0.lvksl.mongodb.net/xnadb?retryWrites=true&w=majority"
//   )
//   .then(() => {
//     console.log("Database connection successful");
//   })
//   .catch((err) => {
//     console.log(process.env.DATABASE);
//     console.error(err);
//   }),
//   //   mongoose.connect( "mongodb://localhost:27017/xnadb")
//   // .then(() => {
//   //     console.log('Database connection successful')
//   //   })
//   //   .catch(err => {
//   //     console.error('Database connection error')
//   //   })
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "Ihsanxna",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // if 1 day * 24 but since *3 its for 3 hours only
    },
  })
);

app.use(require("./controllers/auth"));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("xna/build"));
//   app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "xna", "build", "index.html"));
//     // res.sendFile(path.join(__dirname,"./xna/build/index.html" ));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("hello from backend");
//   });
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// console.log("Path from", path.resolve());
// console.log(__dirname);
