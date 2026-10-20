export type GameSlug =
  | "truth-or-dare"
  | "never-have-i-ever"
  | "most-likely-to"
  | "would-you-rather"
  | "two-truths"
  | "charades"
  | "hot-seat"
  | "rapid-fire"
  | "who-am-i"
  | "story-chain";

export type GameMeta = {
  slug: GameSlug;
  name: string;
  tagline: string;
  players: string;
  duration: string;
  icon: string;
  accent: string;
  how: string[];
};

export const GAMES: GameMeta[] = [
  { slug: "truth-or-dare", name: "Truth or Dare", tagline: "1000 prompts · group classic", players: "3–12", duration: "15–40 min", icon: "⚡", accent: "#6366f1", how: ["Sit in a circle.", "Choose Truth or Dare.", "Group decides if fair.", "Pass clockwise."] },
  { slug: "never-have-i-ever", name: "Never Have I Ever", tagline: "Campus edition · fingers down", players: "4–15", duration: "10–25 min", icon: "🖐️", accent: "#0ea5e9", how: ["Start with 5 fingers up.", "Read Never have I ever…", "Done it → finger down.", "Last standing wins."] },
  { slug: "most-likely-to", name: "Most Likely To", tagline: "Point · vote · laugh", players: "4–20", duration: "10–20 min", icon: "👉", accent: "#f59e0b", how: ["Read prompt.", "On three, point.", "Most pointed takes forfeit.", "Next."] },
  { slug: "would-you-rather", name: "Would You Rather", tagline: "Two options · debate", players: "2–12", duration: "10–30 min", icon: "⚖️", accent: "#14b8a6", how: ["Read A and B.", "Pick a side.", "Minority explains.", "Optional dare."] },
  { slug: "two-truths", name: "Two Truths & a Lie", tagline: "Bluff · catch the fake", players: "3–10", duration: "15–30 min", icon: "🎭", accent: "#a855f7", how: ["Three statements.", "One is a lie.", "Group votes.", "Reveal."] },
  { slug: "charades", name: "Charades", tagline: "Act it out · no words", players: "4–16 teams", duration: "15–35 min", icon: "🎬", accent: "#ef4444", how: ["Two teams.", "Act, no talking.", "60s to guess.", "Points."] },
  { slug: "hot-seat", name: "Hot Seat", tagline: "Rapid questions", players: "3–10", duration: "10–20 min", icon: "🔥", accent: "#f97316", how: ["One in hot seat.", "Fire questions.", "Short answers.", "Rotate."] },
  { slug: "rapid-fire", name: "Rapid Fire", tagline: "3-second answers", players: "3–12", duration: "8–15 min", icon: "💨", accent: "#22c55e", how: ["Answer in 3s.", "Hesitate = pass.", "No debates.", "Warm-up."] },
  { slug: "who-am-i", name: "Who Am I?", tagline: "Guess your identity", players: "4–12", duration: "15–30 min", icon: "❓", accent: "#8b5cf6", how: ["Secret identity.", "Others see it.", "Yes/no only.", "Guess wins."] },
  { slug: "story-chain", name: "Story Chain", tagline: "One sentence each", players: "3–12", duration: "10–25 min", icon: "📖", accent: "#06b6d4", how: ["Opening line.", "Add one sentence.", "Build on last.", "Vote ending."] },
];

export function getGame(slug: string) {
  return GAMES.find((g) => g.slug === slug);
}

const TOD_T = [
  "Most embarrassing campus moment?",
  "First college crush?",
  "Secret you never told your roommate?",
  "Ever skipped class for a silly reason?",
  "Worst grade you hid?",
  "Who here gets your unlocked phone?",
  "Most unpopular campus opinion?",
  "Crush on a professor or TA?",
  "Pettiest thing this semester?",
  "Lie you tell at family gatherings?",
  "Who becomes famous?",
  "Guilty pleasure playlist?",
  "Ever ghosted someone from campus?",
  "Longest no-sleep during exams?",
  "Event you pretend to care about?",
  "Biggest FOMO moment?",
  "Who do you call at 3am?",
  "Most expensive mistake this year?",
  "Habit you want to quit?",
  "Search history fear?",
  "Who intimidates you a little?",
  "Nicest thing someone here did?",
  "Cried in a campus bathroom?",
  "Toxic trait in group projects?",
  "Friendship that started by accident?",
];

const TOD_D = [
  "Harmless text the group chooses.",
  "Impression of someone here · 20s.",
  "Only questions for 2 rounds.",
  "Sing a chorus they pick.",
  "10 push-ups or 20s plank.",
  "Villain voice until next turn.",
  "Love poem about canteen food.",
  "Runway walk.",
  "Alphabet backward fast.",
  "Compliment everyone · one line each.",
  "Dance 15s no music.",
  "Book on head · 30s.",
  "Joke — silence means another dare.",
  "Switch seats with opposite person.",
  "Mime morning routine.",
  "Nickname for this session.",
  "Eye contact left · 15s.",
  "Slow-motion voice one answer.",
  "Silent movie scene.",
  "News-anchor voice next prompt.",
];

function expand(base: string[], n: number, tags: string[]) {
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(`${base[i % base.length]}${tags[i % tags.length]} (#${i + 1})`);
  return out;
}

export const TRUTHS = expand(TOD_T, 500, ["", " Be honest.", " No skipping.", " Group votes.", " Add a place."]);
export const DARES = expand(TOD_D, 500, ["", " Under 30s.", " Extra rule.", " Straight face.", " Stand up."]);

export const NEVER = [
  "Never have I ever bunked a full day.",
  "Never have I ever cried over marks.",
  "Never have I ever had a crush on someone here.",
  "Never have I ever lied about finishing work.",
  "Never have I ever regretted mess food.",
  "Never have I ever been late to an exam.",
  "Never have I ever stalked someone for an hour.",
  "Never have I ever slept in a lecture.",
  "Never have I ever faked being sick.",
  "Never have I ever texted the wrong person.",
  "Never have I ever been locked out.",
  "Never have I ever argued with a professor.",
  "Never have I ever come on a holiday by mistake.",
  "Never have I ever given notes and regretted it.",
  "Never have I ever pulled an all-nighter.",
  "Never have I ever joined a club only for a certificate.",
];

export const MOST = [
  "Who is most likely to become a CEO?",
  "Who is most likely to miss a flight?",
  "Who is most likely to start a campus trend?",
  "Who is most likely to forget their plan?",
  "Who is most likely to survive zombies?",
  "Who is most likely to get famous online?",
  "Who is most likely to sleep in the library?",
  "Who is most likely to order food at 2am?",
  "Who is most likely to win an argument?",
  "Who is most likely to cry in a theatre?",
  "Who is most likely to become a professor?",
  "Who is most likely to move abroad first?",
  "Who is most likely to start a company?",
  "Who is most likely to get lost on campus?",
  "Who is most likely to go viral wrong way?",
  "Who is most likely to finish syllabus first?",
  "Who is most likely to plan the best trip?",
  "Who is most likely to ghost a group project?",
  "Who is most likely to do stand-up?",
  "Who is most likely still friends in 10 years?",
];

export const RATHER: [string, string][] = [
  ["Never social media", "Never junk food"],
  ["Always 10 min late", "Always 1 hour early"],
  ["Only whisper a week", "Only shout a day"],
  ["Lose phone a month", "Lose laptop a week"],
  ["Famous but lonely", "Unknown but loved"],
  ["Retake hard subject", "Speech to 500 people"],
  ["No music a year", "No series a year"],
  ["Always say truth", "Never true opinion"],
  ["No AC summer", "No hot water winter"],
  ["Stranger group project", "Solo impossible deadline"],
];

export const CHARADES = ["Mess line", "Assignment panic", "Attendance", "Cricket ground", "Library fails", "Auto bargain", "First day", "Result day", "Group photo", "Wi-Fi dead", "Alarm fail", "Rain no umbrella"];
export const HOT = ["5-year goal?", "Who inspires you here?", "What are you avoiding?", "Skill you want?", "Comfort food?", "Last proud moment?", "Boundary you need?", "Restart which semester?", "What feels safe?", "Power colour?"];
export const RAPID = ["Favourite spot", "Best subject", "Worst subject", "Morning or night?", "Tea or coffee?", "Intro/extro today?", "One word for group", "Dream city", "Last app", "Pet or plant?"];
export const WHO = ["APJ Abdul Kalam", "Class CR", "Mess uncle", "Film hero", "You at 30", "Cricketer", "Wi-Fi router", "Favourite teacher", "Startup founder", "Library ghost"];
export const STORY = ["11:58pm lab lights flickered…", "Canteen samosa started a revolution…", "Fest day mic failed…", "Lost ID led three strangers…", "Group project folder was empty…"];

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
export function pickIndex(n: number) {
  return Math.floor(Math.random() * n);
}
