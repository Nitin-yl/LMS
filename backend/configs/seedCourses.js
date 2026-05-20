import bcrypt from "bcryptjs";
import Course from "../models/courseModel.js";
import Lecture from "../models/lectureModel.js";
import User from "../models/userModel.js";
import Review from "../models/reviewModel.js";

const sampleEducators = [
  {
    name: "Priya Sharma",
    email: "priya@lms.com",
    password: "Educator123",
    role: "educator",
    description: "Fullstack instructor with 8+ years of experience teaching web and AI courses.",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Akash Patel",
    email: "akash@lms.com",
    password: "Educator123",
    role: "educator",
    description: "App development mentor specializing in mobile UX and React Native.",
    photoUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Meera Singh",
    email: "meera@lms.com",
    password: "Educator123",
    role: "educator",
    description: "Data science coach passionate about analytics, visualization, and business insights.",
    photoUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Rajiv Kumar",
    email: "rajiv@lms.com",
    password: "Educator123",
    role: "educator",
    description: "Cybersecurity expert teaching ethical hacking and secure development practices.",
    photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Ananya Roy",
    email: "ananya@lms.com",
    password: "Educator123",
    role: "educator",
    description: "Design instructor focused on UI/UX, digital product strategy, and interaction design.",
    photoUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80"
  }
];

const sampleStudent = {
  name: "Sample Student",
  email: "student@lms.com",
  password: "Student123",
  role: "student",
  description: "Demo student account for sample course reviews.",
  photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
};

const sampleCourses = [
  {
    title: "AI & Machine Learning Bootcamp",
    subTitle: "Build intelligent models with Python and AI techniques.",
    description: "Hands-on practice with machine learning algorithms, data preprocessing, and model deployment. Ideal for aspiring AI engineers.",
    category: "AI/ML",
    level: "Intermediate",
    price: 59,
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "Fullstack Web Development",
    subTitle: "Create modern web apps with React, Node.js, and MongoDB.",
    description: "Build real-world frontend and backend systems, authentication, and responsive user interfaces.",
    category: "Web Development",
    level: "Beginner",
    price: 45,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "Mastering App Development",
    subTitle: "Build cross-platform mobile apps with React Native.",
    description: "Learn navigation, native APIs, and deployment strategies for mobile applications.",
    category: "App Development",
    level: "Intermediate",
    price: 49,
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "Data Science & Visualization",
    subTitle: "Transform data into insights with Python and charts.",
    description: "Explore data cleaning, analysis, and storytelling with plots, dashboards, and case studies.",
    category: "Data Science",
    level: "Beginner",
    price: 39,
    thumbnail: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "Cloud Computing with AWS",
    subTitle: "Deploy scalable cloud applications and services.",
    description: "Understand AWS services, containerization, serverless computing, and cloud architecture.",
    category: "Cloud Computing",
    level: "Intermediate",
    price: 55,
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "DevOps Pipeline Essentials",
    subTitle: "Automate build, test, and deployment workflows.",
    description: "Learn CI/CD, container orchestration, GitOps, and infrastructure automation.",
    category: "DevOps",
    level: "Intermediate",
    price: 52,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "Ethical Hacking Fundamentals",
    subTitle: "Protect systems by learning how attackers operate.",
    description: "Study penetration testing, vulnerability scanning, and secure coding practices.",
    category: "Ethical Hacking",
    level: "Intermediate",
    price: 65,
    thumbnail: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "AI Tools for Business",
    subTitle: "Use modern AI tools to solve business problems.",
    description: "Learn practical workflows with AI assistants, automation, and model-driven analysis.",
    category: "AI Tools",
    level: "Beginner",
    price: 34,
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "UI/UX Design Masterclass",
    subTitle: "Design delightful digital interfaces and experiences.",
    description: "Learn wireframing, prototyping, user research, and interaction design best practices.",
    category: "UI UX Designing",
    level: "Beginner",
    price: 45,
    thumbnail: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "Business Analytics with Excel",
    subTitle: "Deliver insights using Excel and Power Query.",
    description: "Analyze business metrics, forecast trends, and build dashboards in Excel.",
    category: "Business",
    level: "Beginner",
    price: 30,
    thumbnail: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "Data Analytics with Power BI",
    subTitle: "Create interactive reports and dashboards.",
    description: "Use Power BI to connect data sources, model data, and share visual insights.",
    category: "Data Analytics",
    level: "Beginner",
    price: 35,
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "Blockchain Fundamentals",
    subTitle: "Understand decentralized apps and smart contracts.",
    description: "Learn blockchain basics, wallet setup, and creating blockchain applications.",
    category: "Blockchain",
    level: "Beginner",
    price: 48,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "Digital Marketing Strategy",
    subTitle: "Grow engagement with digital campaigns and analytics.",
    description: "Learn SEO, social advertising, email marketing, and performance optimization.",
    category: "Marketing",
    level: "Beginner",
    price: 32,
    thumbnail: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "Product Management for Tech",
    subTitle: "Lead product strategy, execution, and growth.",
    description: "Master product discovery, roadmaps, stakeholder communication, and agile delivery.",
    category: "Product Management",
    level: "Intermediate",
    price: 50,
    thumbnail: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  },
  {
    title: "Cybersecurity for Developers",
    subTitle: "Write secure code and protect applications.",
    description: "Understand secure development, encryption, authentication, and application hardening.",
    category: "Cybersecurity",
    level: "Intermediate",
    price: 54,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    isPublished: true
  }
];

const lectureTemplates = [
  [
    { lectureTitle: "Introduction to AI & ML", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Supervised Learning Basics", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false },
    { lectureTitle: "Building Your First Model", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "React.js Fundamentals", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Node & Express APIs", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "React Native Setup", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Mobile UI Patterns", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "Data Cleaning Techniques", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Data Visualization with Python", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "AWS Architecture Overview", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Deploying with AWS Lambda", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "CI/CD Fundamentals", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Docker and Kubernetes", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "Ethical Hacking Introduction", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Network Penetration Testing", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "AI Tool Workflows", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Business Automation with AI", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "Design Thinking Process", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Prototyping and Testing", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "Excel Dashboard Basics", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Financial Reporting", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "Power BI Layouts", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Data Modeling Tips", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "Blockchain Concepts", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Smart Contract Basics", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "Marketing Fundamentals", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Campaign Optimization", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "Product Discovery", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Roadmap Planning", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ],
  [
    { lectureTitle: "Secure Coding Practices", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: true },
    { lectureTitle: "Application Hardening", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", isPreviewFree: false }
  ]
];

const sampleReviews = [
  "Fantastic course — learned a lot.",
  "Very practical and easy to follow.",
  "Great instructor and clear examples.",
  "This course helped me build confidence.",
  "Highly recommended for beginners."
];

const seedCourses = async () => {
  try {
    const existingCourses = await Course.find().select("title");
    const existingTitles = existingCourses.map((course) => course.title);

    const educatorUsers = [];
    for (const educator of sampleEducators) {
      let user = await User.findOne({ email: educator.email });
      if (!user) {
        const hashPassword = await bcrypt.hash(educator.password, 10);
        user = await User.create({
          name: educator.name,
          email: educator.email,
          password: hashPassword,
          role: educator.role,
          description: educator.description,
          photoUrl: educator.photoUrl
        });
      }
      educatorUsers.push(user);
    }

    let studentUser = await User.findOne({ email: sampleStudent.email });
    if (!studentUser) {
      const hashPassword = await bcrypt.hash(sampleStudent.password, 10);
      studentUser = await User.create({
        name: sampleStudent.name,
        email: sampleStudent.email,
        password: hashPassword,
        role: sampleStudent.role,
        description: sampleStudent.description,
        photoUrl: sampleStudent.photoUrl
      });
    }

    const coursesToCreate = sampleCourses.filter(
      (course) => !existingTitles.includes(course.title)
    );

    if (coursesToCreate.length === 0) {
      console.log(`Course seed skipped: all ${sampleCourses.length} sample courses already exist.`);
      return;
    }

    const seededCourses = [];
    for (let i = 0; i < coursesToCreate.length; i++) {
      const creator = educatorUsers[i % educatorUsers.length];
      const courseData = { ...coursesToCreate[i], creator: creator._id };
      const course = await Course.create(courseData);
      seededCourses.push({ course, originalIndex: sampleCourses.findIndex((item) => item.title === course.title) });
    }

    for (const entry of seededCourses) {
      const course = entry.course;
      const index = entry.originalIndex;
      const lectures = lectureTemplates[index] || [];
      const createdLectures = await Lecture.insertMany(
        lectures.map((lecture) => ({ ...lecture }))
      );
      course.lectures = createdLectures.map((lecture) => lecture._id);
      await course.save();

      const review = await Review.create({
        course: course._id,
        user: studentUser._id,
        rating: 4 + (index % 2),
        comment: sampleReviews[index % sampleReviews.length]
      });
      course.reviews = [review._id];
      await course.save();
    }

    console.log(`Seeded ${coursesToCreate.length} missing sample course(s).`);
  } catch (error) {
    console.error("Course seed failed:", error);
  }
};

export default seedCourses;
