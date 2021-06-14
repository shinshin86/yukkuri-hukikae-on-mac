![yukkuri-hukikae-on-mac](https://user-images.githubusercontent.com/8216064/121838980-001ef180-cd14-11eb-8ac8-381da8202504.png)

# yukkuri-hukikae-on-mac

[Web Speech API](https://developer.mozilla.org/ja/docs/Web/API/Web_Speech_API) を用いて認識した声を、ゆっくりの声で再生するための Mac 用のソフトウェアです。

Mac 環境で自身の声を、ゆっくりの声で吹き替えたい場合にご利用ください。

ウェブアプリとなっているため、ソフトウェアを実行後、 `localhost:3000` にアクセスして、ブラウザ上で利用します。

なお、依存するライブラリの関係上、実行の際には Mac 環境に Node.js の `v10.24.1` をインストールした上でご利用ください。

**こちらのアプリは現在 beta 版であり、すべての Mac 環境での動作は保証していませんことを予めご了承ください。**

## yukkuri-hukikae-on-mac を無料で試す

機能に制限はかかりますが、評価版をダウンロードして試すことが可能です。

利用方法については `vendor-aqtk` に AquesTalk10、AqKanji2Koe の評価版ライブラリを入れます。

評価版は下記からダウンロードしてください。

[評価版ダウンロード - AQUEST](https://www.a-quest.com/download.html)

ダウンロードしたライブラリを `vendor-aqtk` に格納した後、下記のコマンドを入力することで試すことが可能です。

```sh
# ライブラリのインストール
yarn install

# 実行
yarn start
```

`yarn start`でサーバが起動したのを確認後、 `localhost:3000` にアクセスし、マイク入力を許可することで音声認識が開始されます。

### 動作イメージ

なお、`クリックして画像を設定` を押すことでアバター画像を設定できます。

![Demo image](https://user-images.githubusercontent.com/8216064/121839135-6c015a00-cd14-11eb-9dcb-4143413fbf56.png)

## 注意事項

こちらのライブラリの開発は評価版ライセンスを用いて開発しています。

このソフトウェアを実際に利用する際には、適切なライセンスを購入・入手した上で、ご利用ください。

ライセンスに関する詳細は株式会社アクエスト様の公式ウェブサイト上にある、下記のページを参照してください。

[AQUEST - ライセンス](https://www.a-quest.com/licence.html)

また、当ソフトウェアに関する質問・フィードバックはこちらの[リポジトリで Issue をあげる](https://github.com/shinshin86/yukkuri-hukikae-on-mac/issues)か、[作成者の Twitter アカウント](https://twitter.com/shinshin86)経由でご質問ください。

株式会社アクエスト様への問い合わせは行わないようにしてください。

## 利用している主要なライブラリ

`yukkuri-hukikae-on-mac` を構成する上で利用している主要な `AquesTalk` 関連のライブラリを下記にあげます。

- AquesTalk10、AqKanji2Koe
  - こちらのライブラリはこのリポジトリ内のソースには含まれていません
  - [AQUEST - ライセンス](https://www.a-quest.com/licence.html)を参考に、適切なライセンスを購入・入手した上で、 `vendor-aqtk` 内に格納してご利用ください。
  - 評価版を用いて試すことも可能です。
- [aquestalk-mac](https://github.com/taku-o/aquestalk-mac)
  - AquesTalk を Mac 上から利用するためにこちらのライブラリを利用しています。`yarn install`することでライブラリはインストールされます。
  - また、ソフトウェア内のコードはこちらのライブラリのサンプルコードを大いに参考にさせていただいています。

## 開発時に利用するコマンド

下記のコマンドでローカルサーバを起動することで、コードの変更がその場で適用されるようになります。

```sh
yarn dev
```

コードのフォーマットには `prettier`を利用しています。

下記のコマンドを実行することで、コードのフォーマットを実行します。

```sh
yarn fmt
```

## ライセンス

このソフトウェアは AquesTalk エンジンを用いたソフトウェアです。
AquesTalk は含まれておらず、AquesTalk の評価版を使用して開発されています。

このソフトウェアを使用する場合は、AquesTalk のライセンスを取得・購入するか、評価版ライセンスを取得する必要があります。
