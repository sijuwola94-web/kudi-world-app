 import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('wallets');
  const [amount, setAmount] = useState('');
  const [fromWallet, setFromWallet] = useState('NGN');
  const [toWallet, setToWallet] = useState('CVE');
  const [username, setUsername] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [verifiedName, setVerifiedName] = useState('');

  // REFERRAL SYSTEM - ALL COUNTRY
  const [referralCode] = useState('sijuwola94');
  const [referrals, setReferrals] = useState([]); // {phone, country, idVerified}
  const [bonusBalance, setBonusBalance] = useState(0);
  const [pendingBonus, setPendingBonus] = useState(0);
  const [loginStreak, setLoginStreak] = useState(1);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('NG');
  const [idNumber, setIdNumber] = useState('');
  const [idVerified, setIdVerified] = useState(false);
  const [referredPhone, setReferredPhone] = useState('');

  const wallets = [
    { code: 'NGN', name: 'Nigerian Naira', balance: 850000, symbol: '₦', flag: '🇳🇬' },
    { code: 'CVE', name: 'Cape Verde Escudo', balance: 125000, symbol: '$', flag: '🇨🇻' },
    { code: 'USD', name: 'US Dollar', balance: 1200, symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', balance: 850, symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', balance: 650, symbol: '£', flag: '🇬🇧' },
    { code: 'GHS', name: 'Ghana Cedis', balance: 5200, symbol: '₵', flag: '🇬🇭' },
    { code: 'ZAR', name: 'South African Rand', balance: 15000, symbol: 'R', flag: '🇿🇦' },
    { code: 'KES', name: 'Kenya Shilling', balance: 95000, symbol: 'KSh', flag: '🇰🇪' },
    { code: 'XOF', name: 'West African CFA', balance: 450000, symbol: 'CFA', flag: '🇸🇳' },
    { code: 'USDT', name: 'Tether', balance: 500, symbol: '$', flag: '₮' },
  ];

  const rates = { NGN_TO_CVE: 0.22, CVE_TO_NGN: 4.5 };
  const REF_BONUS = 1500;
  const LOGIN_BONUS_TOTAL = 700;
  const MIN_REF = 50;
  const WITHDRAW_LIMIT = 250000;

  const handleConvert = () => {
    const amt = parseFloat(amount);
    if (!amt) return Alert.alert('Enter amount');
    let result = fromWallet === 'NGN' && toWallet === 'CVE' ? amt * rates.NGN_TO_CVE : amt * rates.CVE_TO_NGN;
    const fee = result * 0.01;
    const final = result - fee;
    Alert.alert('KUDI WORLD Convert', `Send: ${amt} ${fromWallet}\nGet: ${final.toFixed(2)} ${toWallet}\nFee: ${fee.toFixed(2)}\nBCN Share: 50%`);
    setAmount('');
  };

  const handleSendUser = () => {
    if (!username) return Alert.alert('Enter @username');
    Alert.alert('KUDI WORLD', `Sent to @${username} - FREE`);
    setUsername('');
  };

  const handleVerifyBank = () => {
    if (accountNumber.length < 5) return Alert.alert('Enter account number');
    const mockNames = { 'BCN': 'JOAO SILVA CABRAL', 'BCA': 'MARIA SANTOS LOPES', 'GTB': 'CHINEDU OKAFOR', 'Access': 'SIJUWOLA OLUWASEUN' };
    const name = mockNames[bankName] || 'KUDI WORLD USER';
    setVerifiedName(name);
    Alert.alert('BCN Verified ✓', `Account: ${accountNumber}\nName: ${name}\nBank: ${bankName}`);
  };

  const handleSendBank = () => {
    if (!verifiedName) return Alert.alert('Verify account first');
    Alert.alert('KUDI WORLD Bank Send', `Sending ${amount} to\n${verifiedName}\n${bankName} - ${accountNumber}\nFee: 1%`);
  };

  // NEW FUNCTIONS
  const handleVerifyID = () => {
    if (!phoneNumber || !idNumber) return Alert.alert('Enter Phone + Country ID');
    if (idNumber.length < 6) return Alert.alert('ID too short');
    setIdVerified(true);
    Alert.alert('ID Verified ✓', `Phone: ${phoneNumber}\nCountry: ${countryCode}\nID: ${idNumber}\nAll countries OK`);
  };

  const handleAddReferral = () => {
    if (!idVerified) return Alert.alert('Verify YOUR ID first - Phone + Country ID');
    if (!referredPhone) return Alert.alert('Enter referred phone');
    // Check duplicate ID
    if (referrals.find(r => r.phone === referredPhone)) return Alert.alert('Already referred');
    
    const newRef = { phone: referredPhone, country: countryCode, idVerified: true, date: new Date().toLocaleDateString() };
    setReferrals([...referrals, newRef]);
    setBonusBalance(bonusBalance + REF_BONUS);
    Alert.alert('Referral Bonus ✓', `+${REF_BONUS} NGN added! Pending withdrawal.\n${referrals.length + 1}/${MIN_REF}`);
    setReferredPhone('');
  };

  const handleLoginBonus = () => {
    if (loginStreak >= 7) return Alert.alert('700 NGN already claimed');
    const daily = 100;
    setLoginStreak(loginStreak + 1);
    setBonusBalance(bonusBalance + daily);
    Alert.alert('Login Bonus', `+${daily} NGN Day ${loginStreak}/7\nTotal login: ${loginStreak * 100}/700 NGN`);
  };

  const handleWithdrawBonus = () => {
    const verifiedCount = referrals.filter(r => r.idVerified).length;
    if (!idVerified) return Alert.alert('Verify your Phone + Country ID first');
    if (verifiedCount < MIN_REF) return Alert.alert(`Need ${MIN_REF} verified - You have ${verifiedCount}`);
    if (bonusBalance <= 0) return Alert.alert('No bonus to withdraw');
    if (totalWithdrawn + bonusBalance > WITHDRAW_LIMIT) return Alert.alert(`Limit ${WITHDRAW_LIMIT} NGN reached`);
    
    Alert.alert('Withdraw Success', `Withdrawing ${bonusBalance} NGN to ${verifiedName || bankName} ${accountNumber}\nPhone: ${phoneNumber} Verified ✓`);
    setTotalWithdrawn(totalWithdrawn + bonusBalance);
    setBonusBalance(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoCircle}><Text style={styles.logoK}>K</Text></View>
        <View><Text style={styles.headerTitle}><Text style={styles.kBig}>K</Text><Text style={styles.udiSmall}>UDI</Text> WORLD</Text><Text style={styles.headerSub}>All Money, One App • {countryCode}</Text></View>
      </View>

      {activeTab === 'wallets' && (
        <ScrollView>
          <View style={styles.totalCard}><Text style={styles.totalLabel}>TOTAL BALANCE + BONUS</Text><Text style={styles.totalAmount}>$2,307.50 + ₦{bonusBalance.toLocaleString()}</Text><Text style={styles.totalSub}>{referrals.length}/{MIN_REF} referrals • {idVerified ? 'ID Verified ✓' : 'Verify ID'}</Text></View>
          {wallets.map((w) => (
            <View key={w.code} style={styles.walletCard}><Text style={styles.walletFlag}>{w.flag}</Text><View style={{ flex: 1 }}><Text style={styles.walletCode}>{w.code} - {w.name}</Text><Text style={styles.walletBal}>{w.symbol} {w.balance.toLocaleString()}</Text></View><View style={styles.kMini}><Text style={styles.kMiniText}>K</Text></View></View>
          ))}
        </ScrollView>
      )}

      {activeTab === 'convert' && (
        <View style={styles.tabContent}>
          <Text style={styles.tabTitle}>CONVERT • Gold K</Text>
          <View style={styles.convertBox}>
            <Text style={styles.label}>From: {fromWallet} → To: {toWallet}</Text>
            <TouchableOpacity onPress={() => { setFromWallet(fromWallet === 'NGN' ? 'CVE' : 'NGN'); setToWallet(toWallet === 'NGN' ? 'CVE' : 'NGN'); }}><Text style={styles.switchBtn}>🔄 Switch</Text></TouchableOpacity>
            <TextInput style={styles.input} placeholder="Amount" placeholderTextColor="#888" value={amount} onChangeText={setAmount} keyboardType="numeric" />
            <TouchableOpacity style={styles.goldBtn} onPress={handleConvert}><Text style={styles.goldBtnText}>Convert with Gold K</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {activeTab === 'send' && (
        <View style={styles.tabContent}>
          <Text style={styles.tabTitle}>SEND TO @USERNAME</Text>
          <View style={styles.convertBox}>
            <TextInput style={styles.input} placeholder="@username like Instagram" placeholderTextColor="#888" value={username} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Amount" placeholderTextColor="#888" value={amount} onChangeText={setAmount} keyboardType="numeric" />
            <TouchableOpacity style={styles.goldBtn} onPress={handleSendUser}><Text style={styles.goldBtnText}>Send Free</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {activeTab === 'bank' && (
        <View style={styles.tabContent}>
          <Text style={styles.tabTitle}>SEND TO REAL BANK • BCN</Text>
          <View style={styles.convertBox}>
            <TextInput style={styles.input} placeholder="Bank: BCN, BCA, GTB, Access" value={bankName} onChangeText={setBankName} placeholderTextColor="#888" />
            <TextInput style={styles.input} placeholder="Account Number" value={accountNumber} onChangeText={setAccountNumber} keyboardType="numeric" placeholderTextColor="#888" />
            <TouchableOpacity style={[styles.goldBtn, {backgroundColor: '#0A3D1F', borderWidth: 1, borderColor: '#FFD700'}]} onPress={handleVerifyBank}><Text style={[styles.goldBtnText, {color: '#FFD700'}]}>Verify with Gold K ✓</Text></TouchableOpacity>
            {verifiedName ? <Text style={{color: '#FFD700', marginTop: 15, fontWeight: '700'}}>✓ Verified: {verifiedName}</Text> : null}
            <TextInput style={[styles.input, {marginTop: 15}]} placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholderTextColor="#888" />
            <TouchableOpacity style={styles.goldBtn} onPress={handleSendBank}><Text style={styles.goldBtnText}>Send to Bank</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {activeTab === 'referral' && (
        <ScrollView style={styles.tabContent}>
          <Text style={styles.tabTitle}>REFERRAL BONUS • 1500 + 700</Text>
          
          <View style={styles.convertBox}>
            <Text style={styles.label}>Step 1: Verify YOUR Phone + Country ID (ALL Countries)</Text>
            <TextInput style={styles.input} placeholder="Phone: +234... +238... +233..." value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" placeholderTextColor="#888" />
            <View style={{flexDirection: 'row'}}>
              <TextInput style={[styles.input, {flex: 1, marginRight: 10}]} placeholder="Country: NG, CV, GH, ZA, KE" value={countryCode} onChangeText={setCountryCode} placeholderTextColor="#888" />
              <TextInput style={[styles.input, {flex: 2}]} placeholder="ID Number: NIN, NIF, Ghana Card..." value={idNumber} onChangeText={setIdNumber} placeholderTextColor="#888" />
            </View>
            <TouchableOpacity style={[styles.goldBtn, {backgroundColor: idVerified ? '#0A3D1F' : '#FFD700'}]} onPress={handleVerifyID}><Text style={styles.goldBtnText}>{idVerified ? '✓ ID Verified' : 'Verify Phone + ID'}</Text></TouchableOpacity>
          </View>

          <View style={[styles.convertBox, {marginTop: 15}]}>
            <Text style={styles.label}>Your Referral Link: @{referralCode}</Text>
            <Text style={{color: '#FFD700', fontWeight: '700', marginBottom: 10}}>Bonus: ₦{bonusBalance.toLocaleString()} | Pending: ₦{pendingBonus} | Withdrawn: ₦{totalWithdrawn}/{WITHDRAW_LIMIT}</Text>
            <Text style={{color: '#fff', marginBottom: 10}}>{referrals.length}/{MIN_REF} Verified Referrals</Text>
            <View style={{backgroundColor: '#000', height: 10, borderRadius: 5, marginBottom: 15}}><View style={{backgroundColor: '#FFD700', width: `${Math.min(100, (referrals.length/MIN_REF)*100)}%`, height: 10, borderRadius: 5}} /></View>
            
            <TextInput style={styles.input} placeholder="Enter Referred Phone + Country" value={referredPhone} onChangeText={setReferredPhone} keyboardType="phone-pad" placeholderTextColor="#888" />
            <TouchableOpacity style={styles.goldBtn} onPress={handleAddReferral}><Text style={styles.goldBtnText}>Add Referral +1500 NGN</Text></TouchableOpacity>

            <TouchableOpacity style={[styles.goldBtn, {marginTop: 10, backgroundColor: '#111', borderWidth: 1, borderColor: '#FFD700'}]} onPress={handleLoginBonus}><Text style={[styles.goldBtnText, {color: '#FFD700'}]}>Daily Login +100 NGN ({loginStreak}/7 = 700 NGN)</Text></TouchableOpacity>

            <TouchableOpacity style={[styles.goldBtn, {marginTop: 15, backgroundColor: referrals.length >= MIN_REF ? '#FFD700' : '#333'}]} onPress={handleWithdrawBonus}><Text style={styles.goldBtnText}>{referrals.length >= MIN_REF ? `Withdraw Bonus to Bank (Max ${WITHDRAW_LIMIT})` : `Need ${MIN_REF - referrals.length} More to Withdraw`}</Text></TouchableOpacity>

            {referrals.map((r, i) => (<Text key={i} style={{color: '#888', marginTop: 8}}>✓ {i+1}. {r.phone} [{r.country}] ID Verified • {r.date}</Text>))}
          </View>
        </ScrollView>
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setActiveTab('wallets')} style={[styles.navBtn, activeTab === 'wallets' && styles.navActive]}><Text style={styles.navText}>💼</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('convert')} style={[styles.navBtn, activeTab === 'convert' && styles.navActive]}><Text style={styles.navText}>🔄</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('send')} style={[styles.navBtn, activeTab === 'send' && styles.navActive]}><Text style={styles.navText}>👤</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('bank')} style={[styles.navBtn, activeTab === 'bank' && styles.navActive]}><Text style={styles.navText}>🏦</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('referral')} style={[styles.navBtn, activeTab === 'referral' && styles.navActive]}><Text style={styles.navText}>🎁</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#111', borderBottomWidth: 2, borderBottomColor: '#FFD700' },
  logoCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  logoK: { fontSize: 28, fontWeight: '900', color: '#0A3D1F' },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },
  kBig: { fontSize: 28, color: '#FFD700' },
  udiSmall: { fontSize: 14, color: '#fff' },
  headerSub: { color: '#888', fontSize: 11 },
  totalCard: { backgroundColor: '#111', margin: 15, padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#FFD700' },
  totalLabel: { color: '#FFD700', fontSize: 11, fontWeight: '700' },
  totalAmount: { color: '#fff', fontSize: 24, fontWeight: '900', marginTop: 5 },
  totalSub: { color: '#888', fontSize: 12, marginTop: 5 },
  walletCard: { flexDirection: 'row', backgroundColor: '#111', marginHorizontal: 15, marginBottom: 10, padding: 15, borderRadius: 12, alignItems: 'center' },
  walletFlag: { fontSize: 28, marginRight: 12 },
  walletCode: { color: '#fff', fontWeight: '700' },
  walletBal: { color: '#FFD700', marginTop: 2 },
  kMini: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center' },
  kMiniText: { fontWeight: '900', color: '#0A3D1F' },
  tabContent: { flex: 1, padding: 15 },
  tabTitle: { color: '#FFD700', fontSize: 18, fontWeight: '900', marginBottom: 15 },
  convertBox: { backgroundColor: '#111', padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#333' },
  label: { color: '#fff', marginBottom: 10 },
  switchBtn: { color: '#FFD700', marginBottom: 15, fontWeight: '700' },
  input: { backgroundColor: '#000', color: '#fff', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#333', marginBottom: 15 },
  goldBtn: { backgroundColor: '#FFD700', padding: 16, borderRadius: 12, alignItems: 'center' },
  goldBtnText: { color: '#000', fontWeight: '900', fontSize: 14 },
  bottomNav: { flexDirection: 'row', backgroundColor: '#111', padding: 10, borderTopWidth: 1, borderTopColor: '#333' },
  navBtn: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 10, marginHorizontal: 3 },
  navActive: { backgroundColor: '#FFD700' },
  navText: { fontWeight: '700', color: '#fff', fontSize: 18 },
});