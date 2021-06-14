module.exports = async (word, voiceType) => {
  if (!word) {
    throw new Error("Error: 喋らせる言葉を引数で指定してください");
  }

  const AquesTalk10Player = require("./aquestalk10");
  const talkOptions = {
    frameworkPath: "./vendor-aqtk/AquesTalk.framework/Versions/A/AquesTalk",
    phontPath: "./vendor-aqtk/phont/aq_f1c.phont",
    speed: 100,
    volume: 1,
  };

  const kanjiOptions = {
    frameworkPath: "./vendor-aqtk/AqKanji2Koe.framework/Versions/A/AqKanji2Koe",
    aqDictPath: "./vendor-aqtk/aq_dic_large",
    devKey: null,
  };

  try {
    const { aq10VoiceList } = require("aquestalk-mac");

    // 声を選択(デフォルトは"aq10_F1")
    talkOptions.options =
      aq10VoiceList().find(({ id }) => id === voiceType) || aq10VoiceList()[0];

    const player = new AquesTalk10Player(talkOptions, kanjiOptions);

    console.log("再生する言葉:", word);
    await player.play(word);
  } catch (err) {
    console.error("エラーが発生しました。");
    console.error(err);
  }
};
