const { AqKanji2Koe, AquesTalk10 } = require("aquestalk-mac");
const Player = require("./player");

class AquesTalk10Player {
  constructor(talkOptions, kanjiOptions) {
    this.talkOptions = talkOptions;
    this.kanjiOptions = kanjiOptions;
    this.aquesTalk10 = new AquesTalk10(talkOptions.frameworkPath);

    if (talkOptions.devKey) {
      this.aquesTalk10.setDevKey(talkOptions.devKey);
    }

    if (talkOptions.usrKey) {
      this.aquesTalk10.setUsrKey(talkOptions.usrKey);
    }

    this.aqKanji2Koe = new AqKanji2Koe(
      kanjiOptions.frameworkPath,
      kanjiOptions.aqDictPath
    );

    if (kanjiOptions.devKey) {
      this.aqKanji2Koe.setDevKey(kanjiOptions.devKey);
    }

    this.player = new Player();
  }

  async play(message) {
    try {
      const encoded = this.aqKanji2Koe.convert(message);
      const bufWav = await this.aquesTalk10.wave(
        encoded,
        this.talkOptions.options
      );
      const playResponse = await this.player.play(
        bufWav,
        this.talkOptions.volume
      );
      return playResponse;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = AquesTalk10Player;
