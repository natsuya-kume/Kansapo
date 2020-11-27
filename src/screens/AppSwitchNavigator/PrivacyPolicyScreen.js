// 利用規約を表示するスクリーン
import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const PrivacyPolicyScreen = () => {
  // googleformを開く関数
  const openSupport = () => {
    Linking.openURL(
      "https://docs.google.com/forms/d/e/1FAIpQLSe9TpS0OZWEERbwkKC-LBPLAySQnVM0XsEoAFbbntWYOf1GSQ/viewform"
    ).then((supported) => {
      if (!supported) {
        console.log(
          "無効なURLです: " +
            "https://docs.google.com/forms/d/e/1FAIpQLSe9TpS0OZWEERbwkKC-LBPLAySQnVM0XsEoAFbbntWYOf1GSQ/viewform"
        );
      } else {
        return Linking.openURL(
          "https://docs.google.com/forms/d/e/1FAIpQLSe9TpS0OZWEERbwkKC-LBPLAySQnVM0XsEoAFbbntWYOf1GSQ/viewform"
        );
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ marginTop: 50, marginBottom: 20 }}>
          <Text style={{ fontSize: 20 }}>プライバシーポリシー</Text>
        </View>
        <View>
          <Text style={styles.termText}>
            Kanさぽ（以下、「本アプリ」といいます）は，本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）
            における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
          </Text>
        </View>
        <View style={styles.termContainer}>
          <Text style={styles.termTextTitle}>第1条（個人情報）</Text>
          <Text style={styles.termText}>
            「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
          </Text>
        </View>
        <View style={styles.termContainer}>
          <Text style={styles.termTextTitle}>第2条（個人情報の収集方法）</Text>
          <Text style={styles.termText}>
            本アプリは，ユーザーが利用登録をする際に入力されたメールアドレス・パスワードを保存します。
            それと共に入力されたメモ情報や出席・欠席・遅刻回数等の情報も保存します。
            また、本アプリでは、利用状況を把握するためのツールとして「Google
            Analytics」を利用しています。「Google
            Analytics」から提供されるクッキー（Cookie）を使用していますが、匿名で収集されており、個人を特定するものではありません。
            Google
            Analyticsにより収集されたデータは、Google社のプライバシーポリシーに基づいて管理されています。Google
            Analyticsの
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://marketingplatform.google.com/about/analytics/terms/jp/"
                )
              }
            >
              <Text style={{ fontWeight: "300", color: "blue" }}>利用規約</Text>
            </TouchableOpacity>
            ・
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://policies.google.com/privacy")
              }
            >
              <Text style={{ fontWeight: "300", color: "blue" }}>
                プライバシーポリシー
              </Text>
            </TouchableOpacity>
            についてはホームページでご確認ください。
          </Text>
        </View>
        <View style={styles.termContainer}>
          <Text style={styles.termTextTitle}>
            第3条（個人情報を収集・利用する目的）
          </Text>
          <Text style={styles.termText}>
            本アプリが個人情報を収集・利用する目的は，以下のとおりです。
            本アプリサービスの提供・運営のため
          </Text>
        </View>
        <View style={styles.termContainer}>
          <Text style={styles.termTextTitle}>第4条（利用目的の変更）</Text>
          <Text style={styles.termText}>
            1.本アプリは，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
          </Text>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.termText}>
              1.人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき
            </Text>
            <Text style={styles.termText}>
              2.公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき
            </Text>
            <Text style={styles.termText}>
              3.国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
            </Text>
            <Text style={styles.termText}>
              4.予め次の事項を告知あるいは公表し，かつ本アプリが個人情報保護委員会に届出をしたとき
            </Text>
          </View>
          <View style={{ paddingLeft: 30 }}>
            <Text style={styles.termText}>
              1.利用目的に第三者への提供を含むこと
            </Text>
            <Text style={styles.termText}>
              2.利用目的に第三者への提供を含むこと
            </Text>
            <Text style={styles.termText}>
              3.第三者に提供されるデータの項目
            </Text>
            <Text style={styles.termText}>
              4.第三者への提供の手段または方法
            </Text>
            <Text style={styles.termText}>
              5.本人の求めに応じて個人情報の第三者への提供を停止すること
            </Text>
            <Text style={styles.termText}>6.本人の求めを受け付ける方法</Text>
          </View>
          <Text style={styles.termText}>
            2.前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。
          </Text>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.termText}>
              1.本アプリが利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
            </Text>
            <Text style={styles.termText}>
              2.合併その他の事由による事業の承継に伴って個人情報が提供される場合
            </Text>
            <Text style={styles.termText}>
              3.個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合
            </Text>
          </View>
        </View>
        <View style={styles.termContainer}>
          <Text style={styles.termTextTitle}>第5条（個人情報の開示）</Text>
          <Text style={styles.termText}>
            1.本アプリは，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。
          </Text>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.termText}>
              1.本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合
            </Text>
            <Text style={styles.termText}>
              2.本アプリの業務の適正な実施に著しい支障を及ぼすおそれがある場合
            </Text>
            <Text style={styles.termText}>
              3.その他法令に違反することとなる場合
            </Text>
          </View>
          <Text style={styles.termText}>
            2.前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。
          </Text>
        </View>
        <View style={styles.termContainer}>
          <Text style={styles.termTextTitle}>
            第6条（個人情報の訂正および削除）
          </Text>
          <Text style={styles.termText}>
            1.ユーザーは，本アプリの保有する自己の個人情報が誤った情報である場合には，本アプリが定める手続きにより，本アプリに対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。
          </Text>
          <Text style={styles.termText}>
            2.本アプリは，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。
          </Text>
          <Text style={styles.termText}>
            3.本アプリは，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。
          </Text>
        </View>
        <View style={styles.termContainer}>
          <Text style={styles.termTextTitle}>
            第7条（個人情報の利用停止等）
          </Text>
          <Text style={styles.termText}>
            1.本アプリは，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。
          </Text>
          <Text style={styles.termText}>
            2.前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。
          </Text>
          <Text style={styles.termText}>
            3.本アプリは，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。
          </Text>
          <Text style={styles.termText}>
            4.前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。
          </Text>
        </View>
        <View style={styles.termContainer}>
          <Text style={styles.termTextTitle}>
            第8条（プライバシーポリシーの変更）
          </Text>
          <Text style={styles.termText}>
            1.本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
          </Text>
          <Text style={styles.termText}>
            2.本アプリが別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします
          </Text>
        </View>
        <View style={styles.termContainer}>
          <Text style={styles.termTextTitle}>第9条（お問い合わせ窓口）</Text>
          <Text style={styles.termText}>
            本アプリは，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。
          </Text>
          <TouchableOpacity onPress={openSupport}>
            <Text style={{ fontWeight: "300", color: "blue" }}>
              「お問い合わせ窓口」はこちら
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  termContainer: {
    marginTop: 20,
  },
  termTextTitle: {
    fontSize: 18,
  },
  termText: {
    fontSize: 15,
    marginVertical: 10,
    lineHeight: 20,
    fontWeight: "300",
  },
});

export default PrivacyPolicyScreen;
