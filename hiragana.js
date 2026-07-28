const TABLE = [
  "あいうえお",
  "かきくけこ",
  "がぎぐげご",
  "さしすせそ",
  "ざじずぜぞ",
  "たちつてと",
  "だぢづでど",
  "なにぬねの",
  "はひふへほ",
  "ばびぶべぼ",
  "ぱぴぷぺぽ",
  "まみむめも",
  "や ゆ よ",
  "らりるれろ",
  "わ   を",
];

const VOWELS = "あいうえお";

function toVowel(ch) {
  for (const row of TABLE) {
    const index = row.indexOf(ch);
    if (index !== -1) {
      return VOWELS[index];
    }
  }
  return ch;
}

const SMALL_TO_NORMAL = {
  ぁ: "あ",
  ぃ: "い",
  ぅ: "う",
  ぇ: "え",
  ぉ: "お",
  っ: "つ",
  ゃ: "や",
  ゅ: "ゆ",
  ょ: "よ",
  ゎ: "わ",
};

export function normalizeLastChar(word) {
  let ch = word.at(-1);

  if (ch === "ー") {
    ch = word.at(-2);
    ch = SMALL_TO_NORMAL[ch] ?? ch;
    ch = toVowel(ch);
    return ch;
  }

  ch = SMALL_TO_NORMAL[ch] ?? ch;
  return ch;
}
