const AudioContext = require("web-audio-engine").StreamAudioContext;
const OfflineAudioContext = require("web-audio-engine").OfflineAudioContext;
const Speaker = require("speaker");

class Player {
  toArrayBuffer(bufWav) {
    const aBuffer = new ArrayBuffer(bufWav.length);
    const view = new Uint8Array(aBuffer);
    for (let i = 0; i < bufWav.length; ++i) {
      view[i] = bufWav[i];
    }
    return aBuffer;
  }

  async play(bufWav, volume) {
    const aBuffer = this.toArrayBuffer(bufWav);
    const audioCtx = new AudioContext();
    let sourceNode = null;
    let gainNode = null;
    let audioPlayNode = null;

    try {
      const decodedData = await audioCtx.decodeAudioData(aBuffer);
      const bufFrameCount = decodedData.length;
      const offlineCtx = new OfflineAudioContext(
        decodedData.numberOfChannels,
        bufFrameCount,
        decodedData.sampleRate
      );

      sourceNode = offlineCtx.createBufferSource();
      sourceNode.buffer = decodedData;

      gainNode = offlineCtx.createGain();
      gainNode.gain.value = volume;

      sourceNode.connect(gainNode);
      gainNode.connect(offlineCtx.destination);

      sourceNode.start(0);

      const renderedBuffer = await offlineCtx.startRendering();

      return new Promise((inResolve) => {
        // play voice
        audioPlayNode = audioCtx.createBufferSource();
        audioPlayNode.buffer = renderedBuffer;
        audioPlayNode.connect(audioCtx.destination);

        audioPlayNode.onended = async () => {
          return new Promise((resolve) => {
            // 最後まで再生されるようにするために1秒待つ
            setTimeout(() => {
              try {
                if (sourceNode) {
                  sourceNode.disconnect();
                }
                if (gainNode) {
                  gainNode.disconnect();
                }
                if (audioPlayNode) {
                  audioPlayNode.disconnect();
                }
                audioCtx.close();
                resolve(inResolve(true));
              } catch (err) {
                console.log(err);
                throw err;
              }
            }, 1000);
          });
        };

        // 音を出力
        audioCtx.pipe(new Speaker());
        audioCtx.resume();

        audioPlayNode.start(0);
      });
    } catch (err) {
      try {
        if (sourceNode) {
          sourceNode.disconnect();
        }

        if (gainNode) {
          gainNode.disconnect();
        }

        if (audioPlayNode) {
          audioPlayNode.disconnect();
        }

        audioCtx.close();
        throw err;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
}

module.exports = Player;
