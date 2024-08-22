import express from "express";
import connectDB from "./connect.js";
import User from "./model/user.js";
import Question from "./model/question.js";
import Reply from "./model/reply.js";
import cors from "cors";
import { Server } from "socket.io";
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT || 5000;

const tours = [


  {
    "id": "01",
    "name": "Chapter 1: Observing the Armies on the Battlefield of Kurukshetra",
    "info": "Two armies, those of the Pandavas and the Kauravas, face each other on the Battlefield of Kurukshetra. Many signs indicate victory for the Pandavas. Dhrtarashtra, the Pandavas’ uncle and the Kauravas’ father, doubts the possibility of his sons’ victory and asks Sanjaya, his secretary, to describe the scene on the battlefield.Arjuna, one of five Pandava brothers, undergoes a crisis just before the fight. He is overwhelmed by compassion for his family members and teachers, whom he is supposed to kill. After submitting before Krishna many noble and moral reasons why he wishes not to fight, Arjuna casts aside his weapons, overwhelmed with grief. Arjuna’s reluctance to fight indicates his kind heart; such a person is fit to receive transcendental knowledge.",
    "image": "https://live.staticflickr.com/65535/53496766582_cac2637d89.jpg",
    "price": "3,895"
  },
  {
    "id": "02",
    "name": "Chapter 2: Contents of the Gita Summarized",
    "info": "Krishna does not sympathize with Arjuna’s arguments. Rather, He reminds Arjuna that his duty is to fight and orders him to overcome his weakness of heart. Arjuna is torn between his aversion to killing his relatives and Krishna’s desire that he should fight. Aggrieved and confused, Arjuna asks Krishna for guidance and becomes his disciple.Krishna takes up the role of Arjuna’s Spiritual Master and teaches him that the soul is eternal and cannot be killed. Dying in battle promotes a fighter to the heavenly planets, so Arjuna should rejoice that those persons he is about to kill will achieve superior births. A person is eternally an individual. Only his body perishes. Thus, there is nothing to lament.Arjuna’s decision not to fight is based on his desire to enjoy life with his relatives, even at the cost of wisdom and duty. Such a mentality keeps one bound to the material world. Krishna advises Arjuna to engage in buddhi-yoga, work without attachment to the results. By fighting in this way, Arjuna will free himself from the cycle of birth and death and become eligible to enter the kingdom of God.",
    "image": "https://live.staticflickr.com/65535/53497650061_b4905c4d8a_w.jpg",
    "price": "3,895"
  },
  {
    "id": "03",
    "name": "Chapter 3: Karma – Yoga",
    "info": "Arjuna is still confused. He thinks that buddhi-yoga means that one should retire from active life and practice penance and austerities. But Krishna says, “no. Fight! But do it in a spirit of renunciation and offer all the results to the Supreme. This is the best purification. By working without attachment, one attains the Supreme.”Performing sacrifices for the pleasure of the Lord guarantees material prosperity and freedom from sinful reactions. Even a self-realized person never gives up his duty. He acts for the sake of educating others.Arjuna then asks the Lord what it is that causes one to engage in sinful acts. Krishna answers that it is lust which induces one to sin. This lust bewilders one and entangles one in the material world. Lust presents itself in the senses, mind, and intelligence, but it can be counteracted by self – control.",
    "image": "https://live.staticflickr.com/65535/53496766602_bf797954f6_w.jpg",
    "price": "1,995"
  },
  {
    "id": " 04",
    "name": "Chapter 4: Transcendental Knowledge",
    "info": "The science of Bhagavad – gita was first spoken by Krishna to Vivasvan, the sun-god. Vivasvan taught the science to his descendents, who taught it to humanity. This system of transmitting knowledge is called disciplic succession.Whenever and wherever there is a decline in religion and a rise of irreligion, Krishna appears in His Original Transcendental Form, untouched by material nature. One who understands the transcendental nature of the Lord attains the Lord’s eternal abode at the time of death.Everyone surrenders to Krishna, directly or indirectly, and Krishna reciprocates according to one’s surrender.Krishna created a system called varnasrama, with divisions of social and spiritual life, to engage people according to their psychophysical natures. By sacrificing the results of work to the Supreme, people gradually rise to the platform of transcendental knowledge. Ignorant and faithless people who doubt the revealed knowledge of the scriptures can never be happy, nor attain God Consciousness.",
    "image": "https://live.staticflickr.com/65535/53498114135_ca90a8814d.jpg",
    "price": "3,895"
  },
  {
    "id": "05",
    "name": "Chapter 05: Karma – yoga – Action in Krishna Consciousness",
    "info": "Arjuna is still confused about what is better: renunciation of work or work in devotion. Krishna explains that devotional service is better. Since everything belongs to Krishna, nothing is one’s own to renounce. Thus whatever one possesses one should use in Krishna’s service. A person working in such consciousness is renounced. This process, called karma yoga, helps one escape the result of fruitive action—entanglement in rebirth.One, who works in devotion with his mind and senses controlled, is in divine consciousness. Although his senses are engaged with sense objects, he is aloof, situated in peace and happiness.",
    "image": "https://live.staticflickr.com/65535/53503833126_44571359c4_z.jpg",
    "price": "1,995"
  },
  {
    "id": "06",
    "name": "Chapter 06: Dhyana – yoga",
    "info": "The process of mystic yoga entails cessation of material activities. Yet the true mystic is not he who performs no duty. A real yogi works according to duty, without attachment to results or a desire for sense gratification. Real yoga entails meeting the Supreme Soul within the heart and following His dictation. This is achieved with the help of a controlled mind. Through knowledge and realization, one becomes unaffected by the dualities of material existence (heat and cold, honor and dishonor, etc.). By regulation of eating, sleeping, work, and recreation, the yogi gains control over his body, mind and activities and becomes steady in his meditation on the transcendent self. Ultimately, he achieves Samadhi, characterized by the ability to relish transcendental pleasure through transcendental sense. The highest yogi is he who always thinks of Krishna, the Supreme Soul",
    "image": "https://live.staticflickr.com/65535/53496812232_66b8e1aa11_n.jpg",
    "price": "3,895"
  },
  {
    "id": "07",
    "name": "Chapter 07: Knowledge of the Absolute",
    "info": "Krishna reveals Himself as the origin of all material and spiritual energies. Although His energy manifests material nature, with three states of being (goodness, passion, and ignorance), Krishna is not under material control. But everyone else is, except those who have surrendered unto Him.Krishna is the essence of everything; the taste of water, the heat in fire, the sound in ether, the light of the sun and the moon, the ability in man, the original fragrance of the earth, the intelligence of the intelligent, and the life of all that lives.Four types of men surrender to Krishna, and four types don’t. Those who do not surrender remain covered by Krishna’s temporary, illusory potency and can never know Him, but pious people become eligible for surrender to devotional service. Among them, those who understand that Krishna is the cause of all causes engage in devotional service with great determination and become dear to Krishna. These rare souls are sure to attain Him.",
    "image": "https://live.staticflickr.com/65535/53504140318_c83a96e10f_w.jpg",
    "price": "1,995"
  },
  {
    "id": "08",
    "name": "Chapter 08: Attaining the Supreme",
    "info": "Arjuna asks Krishna seven questions: What is Brahman? What is self? What are fruitive activities? What is material manifestation? Who are demigods? Who is the Lord of sacrifice? And how can those engaged in devotional service know Krishna at the time of death?Krishna replies “brahman” refers to the indestructible living entity (jiva): the “self” refers to the soul’s intrinsic nature of service; and “fruitive activities” means actions that develop material bodies. The material manifestation is the ever -changing physical nature; the demigods and their planets are part of the universal form of the Supreme Lord; and the Lord of sacrifice is Krishna Himself as the Super soul.As for knowing Krishna at the time of death, it depends on one’s consciousness. The principle is this: “Whatever state of being one remembers when he quits his body, that state he will attain without fail.”Krishna says, “whoever, at the end of life, quits his body remembering Me alone at once attains My nature without a doubt. Therefore, My dear Arjuna, you should always think of Me in the form of Krishna and at the same time carry out your prescribed duty of fighting. With your activities dedicated to Me and your mind and intelligence fixed on Me, you will attain Me without doubt.”During each day of Brahma, all living entities become manifest, and during his night they merge into the unmanifested nature. Although there are auspicious and inauspicious times for leaving one’s body, devotees of Krishna do not care about them, for by engaging in pure devotional service to Krishna they automatically attain all the results derived from studying the Vedas or engaging in sacrifice, charity, philosophical speculation, and so on. Such pure devotees reach the Lord’s Supreme Eternal Abode.",
    "image": "https://live.staticflickr.com/65535/53499898834_6da35f5bb7_w.jpg",
    "price": "3,895"
  },
  {
    "id": "09",
    "name": "Chapter 09: The Most Confidential Knowledge",
    "info": "According to Lord Krishna, the most confidential knowledge, knowledge of devotional service, is the purest knowledge and the topmost education. It gives direct perception of the self by realization, and it is the perfection of religion. It is everlasting and joyfully performed.Krishna’s unmanifested form pervades everything, but Krishna Himself remains detached from matter. Material nature, working under His direction, produces all moving and non-moving beings.Krishna’s unmanifested form pervades everything, but Krishna Himself remains detached from matter. Material nature, working under His direction, produces all moving and non-moving beings.Different worshipers reach different goals. Men who want to attain the heavenly planets worship the demigods and then take birth among them to enjoy godly delights; but such men, after exhausting their pious credits, return to earth. Men, who worship ancestors, go to the planets of the ancestors, and those who worship ghosts become ghosts. But one who worships Krishna with exclusive devotion goes to Him forever.Whatever Krishna’s devotee does, eats, offers, or gives away in charity, he does as an offering unto the Lord. Krishna reciprocates by carrying what His devotee lacks and preserving what he has. By taking shelter of Krishna, even lowborn people can attain the Supreme destination.",
    "image": "https://live.staticflickr.com/65535/53498691837_ef0781b594_n.jpg",
    "price": "1,995"
  },
  {
    "id": "Chapter 10",
    "name": "Chapter 10: the Opulence of the Absolute",
    "info": "Devotees know Krishna as the unborn, the beginning less, the Supreme Lord of all worlds, the creator of the patriarchs from whom all living being descend, the origin of everything.Intelligence, knowledge, truthfulness, mental and sensory control, fearlessness, non-violence, austerity, birth, death, fear, distress, infamy–all qualities, good and bad, are created by Krishna. Devotional service helps one develop all good qualities.The devotees who lovingly engage in devotional service have full faith in Krishna’s opulences, mystic power, and supremacy. The thoughts of such devotees dwell in Krishna. Their lives are devoted to His service, and they derive great bliss and satisfaction by enlightening one another and conversing about Him.Devotees engaged in pure devotional service, even if lacking education or knowledge of the Vedic principles, are helped from within by Krishna, who personally destroys the darkness born out of ignorance.Arjuna has realized Krishna’s position as the Supreme Personality of Godhead, the ultimate abode and the Absolute Truth, the purest, the transcendental and the original person, the unborn, the greatest, the origin, and the Lord of all. Now Arjuna wants to know more. Lord Krishna tells more, and then concludes: “All opulent, beautiful, and glorious creations spring from but a spark of My splendor.”",
    "image": "https://live.staticflickr.com/65535/53504302994_46b805755d_n.jpg",
    "price": "3,895"
  },
  {
    "id": "Chapter 11",
    "name": "Chapter 11: The Universal Form",
    "info": "To protect innocent people from imposters, Arjuna asks Krishna to prove His divinity by exhibiting His universal form – a form that anyone who claims to be God should be prepared to show. Krishna gives Arjuna divine vision by which to see the brilliant, glaring, unlimited universal form, which reveals, in one place, everything that ever was or now is or will be.Arjuna offers obeisances with folded hands and glorifies the Lord. Krishna then reveals that except for the five Pandavas, all the soldiers assembled on the battlefield will be killed. Therefore Krishna exhorts Arjuna to fight as His instrument and guarantees him victory and a flourishing kingdom.Arjuna requests Krishna to withdraw His fearful form and show His original form. The Lord then exhibits His four-armed form and at last His original two-armed form. Upon seeing the Lord’s beautiful humanlike form, Arjuna becomes pacified. One who is engaged in pure devotional service can see such a form.",
    "image": "https://live.staticflickr.com/65535/53502955027_98f069116f_n.jpg",
    "price": "1,995"
  },
  {
    "id": "Chapter 12",
    "name": "Chapter 12: Devotional Service",
    "info": "“Who is more perfect,” Arjuna asks, “the devotee worshiping and servicing the Lord’s personal form or the transcendentalist meditating on the impersonal Brahman?”Krishna replies, “the devotee who fixes his mind on My personal form is most perfect.”Because devotional service employs the mind and senses, it is the easy, natural way for an embodied soul to reach the supreme destination. The impersonal path is unnatural and fraught with difficulties. Krishna does not recommend it.In the topmost stage of devotional service, one’s consciousness is totally fixed on Krishna. A step lower is the practice of regulative devotional service. Lower than that is karma-yoga, renouncing the fruits of action. Indirect processes for attaining the Supreme include meditation and cultivating knowledge.A devotee who is pure, expert, tolerant, self-controlled, equipoised, non-envious, free from false ego, friendly to all living entities, and equal to friends and enemies is dear to the Lord.",
    "image": "https://live.staticflickr.com/65535/53499731248_597a65ca0b_n.jpg",
    "price": "3,895"
  },
  {
    "id": "Chapter 13",
    "name": "Chapter 13: Nature, the Enjoyer and Consciousness",
    "info": "Arjuna wants to know about prakriti (nature), purusa (the enjoyer), ksetra (the field), ksetra-jna (the knower of the field), jnana (knowledge), and gnaya (the object of knowledge).Krishna explains that the ksetra is the conditioned soul’s field of activity the body. Within it reside both the living entity and the Supreme Lord, who are called ksetra-jna, the knowers of the field. Jnana, knowledge, means understanding of the body and its knowers. Knowledge involves qualities such as humility, nonviolence, tolerance, cleanliness, self-control, absence of false ego, and even – mindedness amid pleasant and unpleasant events.Jnaya, the object of knowledge, is the Super soul. Prakriti, nature, is the causes of all material causes and effects. The two purusas, or enjoyers, are the living entity and the Super soul. A person who can see that the individual soul and the Super soul remain unchanged throughout various types of material bodies they successfully inhabit and is said to possess the vision of eternity. By understanding the difference between the body and the knower of the body, and by understanding the process of liberation from material bondage, one reaches the supreme goal.",
    "image": "https://live.staticflickr.com/65535/53502828440_9748ca05f2_n.jpg",
    "price": "3,895"
  },
  {
    "id": "Chapter 14",
    "name": "Chapter 14: The Three Modes of Material Nature",
    "info": "The total material substance is the source of the three modes of material nature: goodness, passion and ignorance. These modes compete in exerting their influence upon the conditioned soul. By observing the modes at work, we can understand that they are active, not we, and that we are separate. In this way, the influence of material nature gradually diminishes and we attain Krishna’s spiritual nature.The mode of goodness illuminates. It frees one from all sinful reactions but conditions one to a sense of happiness and knowledge. One who dies in the mode of goodness attains the higher planets.A person influenced by the mode of passion is plagued by unlimited desires for boundless material enjoyment, especially sex pleasure. To satisfy those desires, he is always forced to engage in hard work that binds him to sinful reactions, resulting in misery. A person in the mode of passion is never satisfied with the position he has already acquired. After death, he again takes birth on earth among persons engaged in fruitive activities.The mode of ignorance means delusion. It fosters madness, indolence, laziness, and foolishness. If one dies in the mode of ignorance, he has to take birth in the animal kingdom or the hellish worlds.A person who transcends the three modes is steady in his behavior, aloof from the temporary material body, and equally disposed towards friends and enemies. Such transcendental qualities can be achieved by full engagement in devotional service.”",
    "image": "https://live.staticflickr.com/65535/53499902444_19c6564bea_n.jpg",
    "price": "3,895"
  },
  {
    "id": "Chapter 15",
    "name": "Chapter 15: The Yoga of the Supreme Person",
    "info": "The “tree” of this material world is but a reflection of the real “tree”, the spiritual world. Just as a tree’s reflection is situated on water, the material reflection of the spiritual world is situated on desire, and no one knows where it begins or ends. This reflected tree is nourished by the three modes of material nature. Its leaves are the Vedic hymns, and its twigs are the objects of the senses. One who wants to disentangle himself from this tree must cut it down with the weapon of detachment and seek shelter of the Supreme Lord.Everyone in this world is fallible, but in the spiritual world everyone is infallible. And beyond all others is the Supreme Person, Krishna.Everyone in this world is fallible, but in the spiritual world everyone is infallible. And beyond all others is the Supreme Person, Krishna.",
    "image": "https://live.staticflickr.com/65535/53510028051_871ed15b2e.jpg",
    "price": "3,895"
  },
  {
    "id": "Chapter 16",
    "name": "Chapter 16: The Divine and Demoniac Natures",
    "info": "Two classes of created beings, the divine and the demoniac, are endowed with different qualities. Godly men like Arjuna possess the godly qualities: charity, self-control, gentleness, modesty, forgiveness, cleanliness, austerity, simplicity, non-violence, truthfulness, tranquility, fearlessness, freedom from anger, cultivation of spiritual knowledge, aversion to fault-finding, compassion for all living beings, freedom from covetousness, and steady determination.Demoniac qualities such as pride, anger, envy, harshness, arrogance, ignorance, Impudence, uncleanliness, and improper behavior bind people in a network of illusion that makes them take birth again and again in demoniac species of life. Unable to approach Krishna, the demoniac gradually sink down to hell.Two kinds of action – regulated and unregulated—yield different results. A person who discards scriptural injunctions attains neither perfection, nor happiness, nor the supreme destination. People regulated by scripture understand what duty is and what is not. They gradually attain the supreme destination by performing acts conducive to self–realization.",
    "image": "https://live.staticflickr.com/65535/53498708887_01b40f0a40_w.jpg",
    "price": "3,895"
  },
  {
    "id": "Chapter 17",
    "name": "Chapter 17: The Divisions of Faith",
    "info": "Arjuna asks. “what mode of nature governs those who do not follow the principles of scripture but worship according to their own imagination?”In reply, Krishna analyzes the different kinds of faith, food, charity, austerity, sacrifice, and penance that mark the different modes of material nature.The three words “om tat sat” are symbolic representations of “Hari is the Supreme Truth”. Om indicates the Supreme, tat is used for getting free from material entanglement, and sat indicates that the Absolute Truth is the objective of devotional service. Any sacrifice, charity, or penance performed without faith in the Supreme is called asat, impermanent.",
    "image": "https://live.staticflickr.com/65535/53504297714_75b1012d8f_w.jpg",
    "price": "3,895"
  },
  {
    "id": "Chapter 18",
    "name": "Chapter 18-Conclusion: The Perfection of Renunciation",
    "info": "Arjuna asks Krishna about the purpose of tyaga (renunciation) and sannyasa (the renounced order of life). Krishna explains these and the five causes of action, the three factors that motivate action, and the three constituents of action. He also describes action, understanding, determination, happiness, and work according to each of the three modes of material nature.One attains perfection by doing one’s own work, not another’s, as prescribed duties are never affected by sinful reactions. Thus one should work as a matter of duty, without attachment or expectation of result. One should never give up one’s duty.The highest platform of self-realization is pure devotional service to Krishna. Accordingly, Krishna advises Arjuna to always depend on Him, work under His protection, and be conscious of Him. If Arjuna refuses to fight for Krishna, he will still be dragged into warfare as it is his nature as a ksatriya to fight. Nonetheless, he is free to decide what he wants to do.By Krishna’s grace, Arjuna’s illusion and doubt vanish, and he chooses to fight according to Krishna’s directions.",
    "image": "https://live.staticflickr.com/65535/53502400771_54fc91dd20_n.jpg",
    "price": "3,895"
  }

];

app.use(express.json());
app.use(
  cors({
    origin: "https://gitasoulconnect.vercel.app",
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get('/tours', (req, res) => {
  res.json(tours);
});

// create a new user
app.post("/signup", async (req, res) => {
  const { name, password, email, profileImage } = req.body;

  // console.log("Received data:", req.body);

  try {
    // Check if the username already exists
    const findUserByName = await User.findOne({ name });
    if (findUserByName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if the email already exists
    const findUserByEmail = await User.findOne({ email });
    if (findUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    // Create the new user with the hashed password
    const newUser = await User.create({ name, password: hashedPassword, email, profileImage });
    console.log("User created:", newUser);

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Log the full error for better debugging
    console.error("Error during signup:", error);

    // Send a more detailed error message (optional, for development)
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
});



app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    return res.status(200).json(findUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// add question
app.post("/ask-question", async (req, res) => {
  const { question, description, userId, tags } = req.body;
  try {
    const newQuestion = await Question.create({
      question,
      description,
      author: userId,
      tags,
    });
    return res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/answer/:id", async (req, res) => {
  const { answer, userId } = req.body;

  const { id: questionId } = req.params;
  try {
    const reply = await Reply.create({ reply: answer, author: userId });
    const findQuestion = await Question.findById(questionId);
    console.log("find", findQuestion);
    const addReply = await findQuestion.updateOne({
      $push: { replies: reply._id },
    });
    return res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// general routes
app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find({})
      .populate("replies")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          model: "DiscussionUser",
        },
      })
      .populate("author")
      .sort({ createdAt: -1 });
    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/upvote/:id", async (req, res) => {
  const { id: questionId } = req.params;
  const { userId } = req.body;
  try {
    const findQuestion = await Question.findById(questionId);
    if (findQuestion.upvote.includes(userId)) {
      return res.status(400).json({ message: "You have already upvoted" });
    }

    if (findQuestion.downvote.includes(userId)) {
      const downvote = await findQuestion.updateOne({
        $pull: { downvote: userId },
      });
      return res.status(200).json({ message: "Response updated successfully" });
    }

    const upvote = await findQuestion.updateOne({
      $push: { upvote: userId },
    });
    return res.status(200).json(upvote);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/downvote/:id", async (req, res) => {
  const { id: questionId } = req.params;
  const { userId } = req.body;
  try {
    const findQuestion = await Question.findById(questionId);
    if (findQuestion.downvote.includes(userId)) {
      return res.status(400).json({ message: "You have already downvoted" });
    }

    if (findQuestion.upvote.includes(userId)) {
      const upvote = await findQuestion.updateOne({
        $pull: { upvote: userId },
      });
      return res.status(200).json({ message: "Response updated successfully" });
    }

    const downvote = await findQuestion.updateOne({
      $push: { downvote: userId },
    });
    return res.status(200).json(downvote);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/allusers", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/my-questions/:id", async (req, res) => {
  const { id: userId } = req.params;
  try {
    const replies = await Question.find({ author: userId })
      .populate("replies")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          model: "DiscussionUser",
        },
      })
      .populate("author")
      .sort({
        createdAt: -1,
      });
    return res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/find/:topic", async (req, res) => {
  const { topic } = req.params;
  try {
    const questions = await Question.find({
      tags: {
        $in: [topic],
      },
    })
      .populate("replies")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          model: "DiscussionUser",
        },
      })
      .populate("author")
      .sort({ createdAt: -1 });
    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const deleteUser = async () => {
  try {
    const deleteQuestion = await Question.deleteMany({});
    const deleteReply = await Reply.deleteMany({});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const server = app.listen(PORT, () => {
  connectDB();
  //deleteUser();
  console.log(`Server running on port ${PORT}`);
});

const io = new Server(server, {
  secure: true,
  cors: {
    origin: "https://gitasoulconnect.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");
  const users = [];

  for (let [id, socket] of io.of("/").sockets) {
    if (socket.handshake.auth._id)
      users.push({
        ...socket.handshake.auth,
        socketId: socket.handshake.auth._id,
      });
  }

  console.log("users", users);
  io.emit("user-connected", users);

  socket.on("join-room", ({ room, user }) => {
    users[user._id] = user;
    socket.join(room);
  });

  socket.on("send-message", ({ message, room, user }) => {
    console.log("message", message, room, user);
    io.to(room).emit("receive-message", { message, user, room });
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    const delUser = users.filter(
      (user) => user.socketId !== socket.handshake.auth._id
    );
    console.log("disconnected users", delUser);
    io.emit("user-disconnected", delUser);
  });
});

export default app;
