import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('wallets');
  const [amount, setAmount] = useState('');
  const [fromWallet, setFromWallet] = useState('NGN');
  const [toWallet, setToWallet] = useState('CVE');
  const [username, setUsername] = useState('');

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

  const handleConvert = () => {
    const amt = parseFloat(amount);
    if (!amt) return Alert.alert('Enter amount');
    let result = fromWallet === 'NGN' && toWallet === 'CVE' ? amt * rates.NGN_TO_CVE : amt * rates.CVE_TO_NGN;
    const fee = result * 0.01;
    const final = result - fee;
    Alert.alert('KUDI WORLD Convert', `Send: ${amt} ${fromWallet}\nGet: ${final.toFixed(2)} ${toWallet}\nFee (1%): ${fee.toFixed(2)}\n\nFor BCN: 50% fee share`);
    setAmount('');
  };

  const handleSendUser = () => {
    if (!username) return Alert.alert('Enter @username');
    Alert.alert('KUDI WORLD', `Sent to @${username} - FREE (like Instagram)`);
    setUsername('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER - K BIG, UDI small + Gold Circle K */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoK}>K</Text>
        </View>
        <View>
          <Text style={styles.headerTitle}><Text style={styles.kBig}>K</Text><Text style={styles.udiSmall}>UDI</Text> WORLD</Text>
          <Text style={styles.headerSub}>All Money, One App • Praia, CV</Text>
        </View>
      </View>

      {activeTab === 'wallets' && (
        <ScrollView>
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>TOTAL BALANCE</Text>
            <Text style={styles.totalAmount}>$2,307.50 USD</Text>
            <Text style={styles.totalSub}>≈ 850,000 NGN • 10 wallets</Text>
          </View>
          {wallets.map((w) => (
            <View key={w.code} style={styles.walletCard}>
              <Text style={styles.walletFlag}>{w.flag}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.walletCode}>{w.code} - {w.name}</Text>
                <Text style={styles.walletBal}>{w.symbol} {w.balance.toLocaleString()}</Text>
              </View>
              <View style={styles.kMini}><Text style={styles.kMiniText}>K</Text></View>
            </View>
          ))}
        </ScrollView>
      )}

      {activeTab === 'convert' && (
        <View style={styles.tabContent}>
          <Text style={styles.tabTitle}>CONVERT • Gold K</Text>
          <View style={styles.convertBox}>
            <Text style={styles.label}>From: {fromWallet}</Text>
            <TouchableOpacity onPress={() => { setFromWallet(fromWallet === 'NGN' ? 'CVE' : 'NGN'); setToWallet(toWallet === 'NGN' ? 'CVE' : 'NGN'); }}>
              <Text style={styles.switchBtn}>🔄 Switch to {fromWallet === 'NGN' ? 'CVE → NGN' : 'NGN → CVE'}</Text>
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder="Amount" placeholderTextColor="#888" value={amount} onChangeText={setAmount} keyboardType="numeric" />
            <Text style={styles.resultText}>To: {toWallet} • Rate: 1 NGN = 0.22 CVE</Text>
            <TouchableOpacity style={styles.goldBtn} onPress={handleConvert}>
              <Text style={styles.goldBtnText}>Convert with Gold K</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {activeTab === 'send' && (
        <View style={styles.tabContent}>
          <Text style={styles.tabTitle}>SEND TO @USERNAME</Text>
          <View style={styles.convertBox}>
            <TextInput style={styles.input} placeholder="@username like Instagram" placeholderTextColor="#888" value={username} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Amount" placeholderTextColor="#888" value={amount} onChangeText={setAmount} keyboardType="numeric" />
            <TouchableOpacity style={styles.goldBtn} onPress={handleSendUser}>
              <Text style={styles.goldBtnText}>Send Free</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setActiveTab('wallets')} style={[styles.navBtn, activeTab === 'wallets' && styles.navActive]}><Text style={styles.navText}>💼 Wallets</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('convert')} style={[styles.navBtn, activeTab === 'convert' && styles.navActive]}><Text style={styles.navText}>🔄 Convert</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('send')} style={[styles.navBtn, activeTab === 'send' && styles.navActive]}><Text style={styles.navText}>👤 Send</Text></TouchableOpacity>
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
  totalAmount: { color: '#fff', fontSize: 32, fontWeight: '900', marginTop: 5 },
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
  resultText: { color: '#888', marginBottom: 15 },
  goldBtn: { backgroundColor: '#FFD700', padding: 16, borderRadius: 12, alignItems: 'center' },
  goldBtnText: { color: '#000', fontWeight: '900', fontSize: 16 },
  bottomNav: { flexDirection: 'row', backgroundColor: '#111', padding: 10, borderTopWidth: 1, borderTopColor: '#333' },
  navBtn: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 10, marginHorizontal: 5 },
  navActive: { backgroundColor: '#FFD700' },
  navText: { fontWeight: '700', color: '#fff' },
});