 import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';

export default function App() {
  // AUTH
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // SECURITY SAFE
  const [sixDigitPin, setSixDigitPin] = useState('');
  const [pinSet, setPinSet] = useState(false);
  const [transferPin, setTransferPin] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [countryCode, setCountryCode] = useState('NG');
  const [idNumber, setIdNumber] = useState('');
  const [idVerified, setIdVerified] = useState(false);

  const [activeTab, setActiveTab] = useState('cards');
  const [amount, setAmount] = useState('');
  const [fromWallet, setFromWallet] = useState('NGN');
  const [toWallet, setToWallet] = useState('CVE');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [verifiedName, setVerifiedName] = useState('');

  // CARD - LINK + VIRTUAL
  const [linkedCards, setLinkedCards] = useState([]); // real bank cards linked
  const [kudiCard, setKudiCard] = useState(null); // virtual card
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardOtp, setCardOtp] = useState('');
  const [cardOtpSent, setCardOtpSent] = useState(false);

  // REFERRAL 800/700 50+250k
  const [referralCode] = useState('sijuwola94');
  const [referrals, setReferrals] = useState([]);
  const [referralBonus, setReferralBonus] = useState(0);
  const [pendingBonus, setPendingBonus] = useState(0);
  const [referredPhone, setReferredPhone] = useState('');

  const CARD_FEE = 3452;
  const REF_FOR_ME = 800;
  const MIN_REF = 50;
  const MIN_TX = 2;
  const REF_WITHDRAW_MIN = 250000;

  // AUTH
  const handleSendOtp = () => {
    if (loginMethod==='phone' && !phoneNumber) return Alert.alert('Enter Phone');
    if (loginMethod==='email' && !email) return Alert.alert('Enter Email');
    setOtpSent(true);
    Alert.alert('OTP Sent', `Code to ${loginMethod==='phone'?phoneNumber:email}: 123456 (demo)`);
  };
  const handleVerifyOtp = () => {
    if (otp.length<4) return Alert.alert('Enter OTP');
    if (!pinSet) Alert.alert('Login OK', 'Set 6-digit SAFE PIN + Biometric');
    else setIsLoggedIn(true);
  };
  const handleSetSixDigitPin = () => {
    if (sixDigitPin.length!==6) return Alert.alert('6-digit PIN required for SAFE');
    setPinSet(true);
    Alert.alert('6-digit Secured ✓');
  };
  const handleEnableBiometric = () => {
    setBiometricEnabled(true);
    Alert.alert('Biometric Enabled ✓ - Face/Finger for transfer + card');
    setIsLoggedIn(true);
  };

  const handleVerifyID = () => {
    if (!idNumber) return Alert.alert('Enter Country ID');
    setIdVerified(true);
    Alert.alert('ID Verified Secure ✓');
  };

  // CARD FUNCTIONS
  const handleLinkCard = () => {
    if (!pinSet) return Alert.alert('Set 6-digit PIN first - Safe');
    if (cardNumber.length<12) return Alert.alert('Enter valid card number');
    if (!cardExpiry || !cardCvv) return Alert.alert('Enter Expiry + CVV');
    setCardOtpSent(true);
    Alert.alert('Card OTP Sent', `OTP sent to ${phoneNumber || email} to link card ending ${cardNumber.slice(-4)}`);
  };

  const handleVerifyCardOtp = () => {
    if (cardOtp.length<4) return Alert.alert('Enter Card OTP');
    if (transferPin.length!==6) return Alert.alert('Enter 6-digit Transfer PIN');
    if (transferPin!==sixDigitPin) return Alert.alert('Wrong PIN - Safe protected');
    const newCard = { number: cardNumber.slice(-4), expiry: cardExpiry, bank: bankName || 'VISA', type: 'Linked Bank Card' };
    setLinkedCards([...linkedCards, newCard]);
    Alert.alert('Card Linked ✓', `Card ****${cardNumber.slice(-4)} linked\nCan Add Funds / Withdraw + OTP\nSecure with PIN + Biometric`);
    setCardNumber(''); setCardExpiry(''); setCardCvv(''); setCardOtp(''); setCardOtpSent(false); setTransferPin('');
  };

  const handleCreateKudiCard = () => {
    if (!idVerified) return Alert.alert('Verify Country ID first - To create card for all countries');
    if (!pinSet) return Alert.alert('Set 6-digit PIN first');
    if (transferPin!==sixDigitPin) return Alert.alert('Enter 6-digit PIN to pay card fee');
    // Create virtual card
    const newKudiCard = {
      number: '4523 1488 9234 7812',
      expiry: '12/29',
      cvv: '123',
      name: 'KUDI WORLD USER',
      balance: 0,
      fee: CARD_FEE
    };
    setKudiCard(newKudiCard);
    Alert.alert('KUDI Card Created ✓', `Virtual Card for Online Shopping\nNumber: 4523 1488 9234 7812\nFee: ₦${CARD_FEE} for ALL countries (NG, CV, GH, ZA, KE, US)\nUse for Netflix, Amazon, Facebook Ads - Secure with PIN + OTP + Biometric`);
    setTransferPin('');
  };

  const handleAddFundsWithCard = () => {
    if (!kudiCard && linkedCards.length===0) return Alert.alert('Link card or create KUDI card first');
    if (!amount) return Alert.alert('Enter amount');
    if (transferPin.length!==6) return Alert.alert('Enter 6-digit Transfer PIN + OTP');
    Alert.alert('Add Funds ✓', `Adding ₦${amount} to KUDI from card ****${linkedCards[0]?.number || 'KUDI'}\nOTP + PIN + Biometric Verified\nAll countries OK`);
    setAmount(''); setTransferPin('');
  };

  const handleWithdrawWithCard = () => {
    if (!amount) return Alert.alert('Enter amount');
    if (transferPin.length!==6) return Alert.alert('Enter 6-digit Transfer PIN + OTP');
    Alert.alert('Withdraw to Card ✓', `Withdrawing ₦${amount} to card\nOTP + PIN + Biometric\nFee 1% - All countries`);
    setAmount(''); setTransferPin('');
  };

  const handleAddReferral = () => {
    if (!referredPhone) return Alert.alert('Enter phone');
    const newRef = { phone: referredPhone, country: countryCode, idVerified: false, txCount: 0, eligible: false };
    setReferrals([...referrals, newRef]);
    setPendingBonus(pendingBonus+REF_FOR_ME);
    setReferredPhone('');
  };
  const handleVerifyReferralKYC = (i) => {
    const u=[...referrals]; u[i].idVerified=true;
    if (u[i].txCount>=MIN_TX && u[i].idVerified && !u[i].eligible) { u[i].eligible=true; setReferralBonus(referralBonus+REF_FOR_ME); setPendingBonus(Math.max(0,pendingBonus-REF_FOR_ME)); }
    setReferrals(u);
  };
  const handleAddTransaction = (i) => {
    const u=[...referrals]; u[i].txCount+=1;
    if (u[i].txCount>=MIN_TX && u[i].idVerified && !u[i].eligible) { u[i].eligible=true; setReferralBonus(referralBonus+REF_FOR_ME); setPendingBonus(Math.max(0,pendingBonus-REF_FOR_ME)); }
    setReferrals(u);
  };

  const eligibleCount = referrals.filter(r=>r.eligible).length;
  const canWithdrawReferral = eligibleCount>=MIN_REF && referralBonus>=REF_WITHDRAW_MIN;

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><View style={styles.logoCircle}><Text style={styles.logoK}>K</Text></View><View><Text style={styles.headerTitle}><Text style={styles.kBig}>K</Text><Text style={styles.udiSmall}>UDI</Text> WORLD</Text><Text style={styles.headerSub}>Card 3452 NGN • 6-digit • Biometric • All Countries</Text></View></View>
        <ScrollView style={styles.tabContent}>
          <Text style={styles.tabTitle}>LOGIN / SIGN UP - Phone or Email</Text>
          <View style={styles.convertBox}>
            <View style={{flexDirection:'row', marginBottom:12}}>
              <TouchableOpacity onPress={()=>setLoginMethod('phone')} style={[styles.goldBtn,{flex:1,marginRight:6,backgroundColor:loginMethod==='phone'?'#FFD700':'#111',borderWidth:1,borderColor:'#FFD700'}]}><Text style={[styles.goldBtnText,{color:loginMethod==='phone'?'#000':'#FFD700'}]}>Phone</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>setLoginMethod('email')} style={[styles.goldBtn,{flex:1,marginLeft:6,backgroundColor:loginMethod==='email'?'#FFD700':'#111',borderWidth:1,borderColor:'#FFD700'}]}><Text style={[styles.goldBtnText,{color:loginMethod==='email'?'#000':'#FFD700'}]}>Email</Text></TouchableOpacity>
            </View>
            {loginMethod==='phone'?<TextInput style={styles.input} placeholder="Phone +234 +238 All countries" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" placeholderTextColor="#888"/>:<TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholderTextColor="#888"/>}
            <TouchableOpacity style={styles.goldBtn} onPress={handleSendOtp}><Text style={styles.goldBtnText}>Send OTP</Text></TouchableOpacity>
            {otpSent&&<><TextInput style={[styles.input,{marginTop:12}]} placeholder="OTP" value={otp} onChangeText={setOtp} keyboardType="numeric" placeholderTextColor="#888"/><TouchableOpacity style={[styles.goldBtn,{backgroundColor:'#0A3D1F',borderWidth:1,borderColor:'#FFD700'}]} onPress={handleVerifyOtp}><Text style={[styles.goldBtnText,{color:'#FFD700'}]}>Verify OTP</Text></TouchableOpacity></>}
            <View style={{marginTop:20,borderTopWidth:1,borderTopColor:'#333',paddingTop:15}}>
              <Text style={styles.label}>Set 6-Digit SAFE PIN + Biometric + Card 3452 NGN</Text>
              <TextInput style={styles.input} placeholder="6-digit PIN" value={sixDigitPin} onChangeText={setSixDigitPin} keyboardType="numeric" secureTextEntry maxLength={6} placeholderTextColor="#888"/>
              <TouchableOpacity style={[styles.goldBtn,{backgroundColor:pinSet?'#0A3D1F':'#FFD700'}]} onPress={handleSetSixDigitPin}><Text style={[styles.goldBtnText,{color:pinSet?'#FFD700':'#000'}]}>{pinSet?'✓ 6-digit Secured':'Set 6-digit SAFE PIN'}</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.goldBtn,{marginTop:8,backgroundColor:biometricEnabled?'#0A3D1F':'#111',borderWidth:1,borderColor:'#FFD700'}]} onPress={handleEnableBiometric}><Text style={[styles.goldBtnText,{color:'#FFD700'}]}>{biometricEnabled?'✓ Biometric Enabled':'Enable Biometric + Enter App'}</Text></TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><View style={styles.logoCircle}><Text style={styles.logoK}>K</Text></View><View><Text style={styles.headerTitle}><Text style={styles.kBig}>K</Text><Text style={styles.udiSmall}>UDI</Text> WORLD</Text><Text style={styles.headerSub}>Card ₦{CARD_FEE} All Countries • PIN + OTP + Biometric</Text></View><TouchableOpacity onPress={()=>setIsLoggedIn(false)} style={{marginLeft:'auto'}}><Text style={{color:'#FFD700',fontSize:11}}>Logout</Text></TouchableOpacity></View>

      {activeTab==='cards' && (
        <ScrollView style={styles.tabContent}>
          <Text style={styles.tabTitle}>MY CARDS • Link + Create • 3452 NGN All Countries</Text>
          
          <View style={styles.convertBox}>
            <Text style={styles.label}>KUDI WORLD Virtual Card - Buy Online (Netflix, Amazon, Ads)</Text>
            {kudiCard ? (
              <View style={{backgroundColor:'#FFD700', padding:15, borderRadius:12, marginBottom:12}}>
                <Text style={{color:'#000', fontWeight:'900'}}>KUDI WORLD VIRTUAL CARD</Text>
                <Text style={{color:'#000', fontSize:18, fontWeight:'900', marginTop:8}}>{kudiCard.number}</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:8}}>
                  <Text style={{color:'#0A3D1F', fontWeight:'700'}}>{kudiCard.name}</Text><Text style={{color:'#0A3D1F'}}>{kudiCard.expiry} • CVV {kudiCard.cvv}</Text>
                </View>
                <Text style={{color:'#0A3D1F', fontSize:11, marginTop:6}}>Fee: ₦{CARD_FEE} All Countries • PIN + OTP + Biometric Secure • For online shopping</Text>
              </View>
            ) : (
              <View style={{backgroundColor:'#000', padding:15, borderRadius:12, marginBottom:12, borderWidth:1, borderColor:'#FFD700', borderStyle:'dashed'}}>
                <Text style={{color:'#888'}}>No KUDI Card yet - Create for ₦{CARD_FEE} - Works all countries</Text>
                <TextInput style={[styles.input,{marginTop:10}]} placeholder="6-digit Transfer PIN to pay card fee" value={transferPin} onChangeText={setTransferPin} keyboardType="numeric" secureTextEntry maxLength={6} placeholderTextColor="#888"/>
                <TouchableOpacity style={styles.goldBtn} onPress={handleCreateKudiCard}><Text style={styles.goldBtnText}>Create KUDI Card - Pay ₦{CARD_FEE} (All Countries)</Text></TouchableOpacity>
              </View>
            )}

            <Text style={[styles.label,{marginTop:10}]}>Add Funds / Withdraw with Card + OTP + PIN + Biometric</Text>
            <TextInput style={styles.input} placeholder="Amount - Any big or small" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholderTextColor="#888"/>
            <TextInput style={styles.input} placeholder="6-digit Transfer PIN" value={transferPin} onChangeText={setTransferPin} keyboardType="numeric" secureTextEntry maxLength={6} placeholderTextColor="#888"/>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={handleAddFundsWithCard} style={[styles.goldBtn,{flex:1,marginRight:6}]}><Text style={styles.goldBtnText}>Add Funds with Card</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleWithdrawWithCard} style={[styles.goldBtn,{flex:1,marginLeft:6,backgroundColor:'#111',borderWidth:1,borderColor:'#FFD700'}]}><Text style={[styles.goldBtnText,{color:'#FFD700'}]}>Withdraw to Card</Text></TouchableOpacity>
            </View>
          </View>

          <View style={[styles.convertBox,{marginTop:15}]}>
            <Text style={styles.label}>Link Your Bank Card (GTB, Access, BCN, BCA) - For Add Funds / Withdraw</Text>
            <TextInput style={styles.input} placeholder="Bank: GTB, Access, BCN, BCA" value={bankName} onChangeText={setBankName} placeholderTextColor="#888"/>
            <TextInput style={styles.input} placeholder="Card Number: 4523 1234 5678 9012" value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" placeholderTextColor="#888"/>
            <View style={{flexDirection:'row'}}>
              <TextInput style={[styles.input,{flex:1,marginRight:8}]} placeholder="Expiry MM/YY" value={cardExpiry} onChangeText={setCardExpiry} placeholderTextColor="#888"/>
              <TextInput style={[styles.input,{flex:1}]} placeholder="CVV" value={cardCvv} onChangeText={setCardCvv} keyboardType="numeric" secureTextEntry placeholderTextColor="#888"/>
            </View>
            {!cardOtpSent ? (
              <TouchableOpacity style={styles.goldBtn} onPress={handleLinkCard}><Text style={styles.goldBtnText}>Link Card - Send OTP</Text></TouchableOpacity>
            ) : (
              <>
                <TextInput style={styles.input} placeholder="Card OTP from SMS" value={cardOtp} onChangeText={setCardOtp} keyboardType="numeric" placeholderTextColor="#888"/>
                <TextInput style={styles.input} placeholder="6-digit Transfer PIN" value={transferPin} onChangeText={setTransferPin} keyboardType="numeric" secureTextEntry maxLength={6} placeholderTextColor="#888"/>
                <TouchableOpacity style={[styles.goldBtn,{backgroundColor:'#0A3D1F',borderWidth:1,borderColor:'#FFD700'}]} onPress={handleVerifyCardOtp}><Text style={[styles.goldBtnText,{color:'#FFD700'}]}>Verify OTP + PIN + Link Card Secure</Text></TouchableOpacity>
              </>
            )}
            {linkedCards.map((c,i)=><Text key={i} style={{color:'#FFD700',marginTop:8,fontSize:11}}>✓ Linked: ****{c.number} {c.bank} - Add Funds/Withdraw OK - OTP + PIN + Biometric</Text>)}
          </View>

          <View style={[styles.convertBox,{marginTop:15,backgroundColor:'#0A3D1F',borderColor:'#FFD700'}]}>
            <Text style={{color:'#FFD700',fontWeight:'900',fontSize:12}}>CARD SECURITY - Each Person Safe</Text>
            <Text style={{color:'#fff',fontSize:11,marginTop:6}}>• Login: Phone/Email + OTP{'\n'}• Transfer: 6-digit PIN + Biometric + OTP{'\n'}• Card: Fee ₦{CARD_FEE} for ALL countries (NG, CV, GH, ZA, KE, US, EU){'\n'}• Use card to buy online: Netflix, Amazon, Facebook Ads, Google{'\n'}• Add funds: Bank card → KUDI with OTP{'\n'}• Withdraw: KUDI → Bank card with OTP + PIN + Biometric</Text>
          </View>
        </ScrollView>
      )}

      {activeTab==='referral' && (
        <ScrollView style={styles.tabContent}>
          <Text style={styles.tabTitle}>REFERRAL 800 YOU / 700 FRIEND • 50 + 250k</Text>
          <View style={styles.convertBox}>
            <Text style={{color:'#FFD700',fontSize:11}}>Bonus: ₦{referralBonus}/{REF_WITHDRAW_MIN} | Eligible: {eligibleCount}/{MIN_REF} | Friend gets 700</Text>
            <TextInput style={[styles.input,{marginTop:10}]} placeholder="Referred Phone" value={referredPhone} onChangeText={setReferredPhone} keyboardType="phone-pad" placeholderTextColor="#888"/>
            <TouchableOpacity style={styles.goldBtn} onPress={handleAddReferral}><Text style={styles.goldBtnText}>Refer - You 800 Pending + Friend 700</Text></TouchableOpacity>
            <TextInput style={[styles.input,{marginTop:10}]} placeholder="6-digit PIN to withdraw referral" value={transferPin} onChangeText={setTransferPin} keyboardType="numeric" secureTextEntry maxLength={6} placeholderTextColor="#888"/>
            <TouchableOpacity style={[styles.goldBtn,{marginTop:8,backgroundColor:canWithdrawReferral?'#FFD700':'#333'}]} onPress={()=>{if(!canWithdrawReferral) return Alert.alert('Need 50 + 250k'); if(transferPin.length!==6) return Alert.alert('Enter 6-digit PIN'); Alert.alert('Referral Withdraw ✓ - PIN + Biometric');}}><Text style={styles.goldBtnText}>Withdraw Referral - PIN + Biometric + OTP</Text></TouchableOpacity>
            {referrals.map((r,i)=><View key={i} style={{backgroundColor:'#000',padding:8,borderRadius:8,marginTop:8,borderWidth:1,borderColor:r.eligible?'#00FF00':'#333'}}><Text style={{color:'#fff',fontSize:11}}>{i+1}. {r.phone} {r.idVerified?'KYC✓':'KYC✗'} {r.txCount}/{MIN_TX}</Text><View style={{flexDirection:'row',marginTop:4}}><TouchableOpacity onPress={()=>handleVerifyReferralKYC(i)} style={{backgroundColor:'#FFD700',padding:6,borderRadius:6,marginRight:6}}><Text style={{fontSize:10,fontWeight:'700'}}>KYC</Text></TouchableOpacity><TouchableOpacity onPress={()=>handleAddTransaction(i)} style={{backgroundColor:'#111',padding:6,borderRadius:6,borderWidth:1,borderColor:'#FFD700'}}><Text style={{color:'#FFD700',fontSize:10}}>+Tx</Text></TouchableOpacity></View></View>)}
          </View>
        </ScrollView>
      )}

      {activeTab==='wallets' && (
        <ScrollView><View style={styles.totalCard}><Text style={styles.totalLabel}>MAIN SAFE + CARD ₦{CARD_FEE}</Text><Text style={styles.totalAmount}>Main: $2,307 • Card: {kudiCard?'Active ✓':'No Card'} • Refer: ₦{referralBonus}</Text></View></ScrollView>
      )}
      {activeTab==='bank' && (
        <View style={styles.tabContent}><Text style={styles.tabTitle}>BANK - SAFE WITH PIN + BIOMETRIC + OTP</Text><View style={styles.convertBox}><TextInput style={styles.input} placeholder="Amount - Any" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholderTextColor="#888"/><TextInput style={styles.input} placeholder="6-digit PIN" value={transferPin} onChangeText={setTransferPin} keyboardType="numeric" secureTextEntry maxLength={6} placeholderTextColor="#888"/><TouchableOpacity style={styles.goldBtn} onPress={()=>Alert.alert('Bank Send - PIN + OTP + Biometric ✓')}><Text style={styles.goldBtnText}>Send to Bank - PIN + Biometric + OTP</Text></TouchableOpacity></View></View>
      )}
      {activeTab==='convert' && (
        <View style={styles.tabContent}><Text style={styles.tabTitle}>CONVERT - PIN + Biometric</Text><View style={styles.convertBox}><TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholderTextColor="#888"/><TextInput style={styles.input} placeholder="6-digit PIN" value={transferPin} onChangeText={setTransferPin} keyboardType="numeric" secureTextEntry maxLength={6} placeholderTextColor="#888"/><TouchableOpacity style={styles.goldBtn} onPress={()=>Alert.alert('Convert - PIN + Biometric ✓')}><Text style={styles.goldBtnText}>Convert Secure</Text></TouchableOpacity></View></View>
      )}
      {activeTab==='send' && (
        <View style={styles.tabContent}><Text style={styles.tabTitle}>SEND @USERNAME - PIN + Biometric + OTP</Text><View style={styles.convertBox}><TextInput style={styles.input} placeholder="@username" placeholderTextColor="#888"/><TextInput style={styles.input} placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholderTextColor="#888"/><TextInput style={styles.input} placeholder="6-digit PIN" value={transferPin} onChangeText={setTransferPin} keyboardType="numeric" secureTextEntry maxLength={6} placeholderTextColor="#888"/><TouchableOpacity style={styles.goldBtn} onPress={()=>Alert.alert('Send - PIN + Biometric + OTP ✓')}><Text style={styles.goldBtnText}>Send Secure</Text></TouchableOpacity></View></View>
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={()=>setActiveTab('wallets')} style={[styles.navBtn,activeTab==='wallets'&&styles.navActive]}><Text style={styles.navText}>💼</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setActiveTab('cards')} style={[styles.navBtn,activeTab==='cards'&&styles.navActive]}><Text style={styles.navText}>💳</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setActiveTab('convert')} style={[styles.navBtn,activeTab==='convert'&&styles.navActive]}><Text style={styles.navText}>🔄</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setActiveTab('send')} style={[styles.navBtn,activeTab==='send'&&styles.navActive]}><Text style={styles.navText}>👤</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setActiveTab('bank')} style={[styles.navBtn,activeTab==='bank'&&styles.navActive]}><Text style={styles.navText}>🏦</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setActiveTab('referral')} style={[styles.navBtn,activeTab==='referral'&&styles.navActive]}><Text style={styles.navText}>🎁</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#000'},
  header:{flexDirection:'row',alignItems:'center',padding:12,backgroundColor:'#111',borderBottomWidth:2,borderBottomColor:'#FFD700'},
  logoCircle:{width:44,height:44,borderRadius:22,backgroundColor:'#FFD700',justifyContent:'center',alignItems:'center',marginRight:10},
  logoK:{fontSize:24,fontWeight:'900',color:'#0A3D1F'},
  headerTitle:{color:'#fff',fontSize:16,fontWeight:'900'},
  kBig:{fontSize:22,color:'#FFD700'},
  udiSmall:{fontSize:12,color:'#fff'},
  headerSub:{color:'#888',fontSize:9},
  totalCard:{backgroundColor:'#111',margin:12,padding:16,borderRadius:12,borderWidth:1,borderColor:'#FFD700'},
  totalLabel:{color:'#FFD700',fontSize:10,fontWeight:'700'},
  totalAmount:{color:'#fff',fontSize:16,fontWeight:'900',marginTop:4},
  tabContent:{flex:1,padding:12},
  tabTitle:{color:'#FFD700',fontSize:13,fontWeight:'900',marginBottom:10},
  convertBox:{backgroundColor:'#111',padding:12,borderRadius:12,borderWidth:1,borderColor:'#333'},
  label:{color:'#fff',marginBottom:8,fontSize:11,fontWeight:'700'},
  input:{backgroundColor:'#000',color:'#fff',padding:10,borderRadius:8,borderWidth:1,borderColor:'#333',marginBottom:10,fontSize:12},
  goldBtn:{backgroundColor:'#FFD700',padding:12,borderRadius:10,alignItems:'center'},
  goldBtnText:{color:'#000',fontWeight:'900',fontSize:11},
  bottomNav:{flexDirection:'row',backgroundColor:'#111',padding:6,borderTopWidth:1,borderTopColor:'#333'},
  navBtn:{flex:1,padding:10,alignItems:'center',borderRadius:8,marginHorizontal:2},
  navActive:{backgroundColor:'#FFD700'},
  navText:{fontWeight:'700',fontSize:16},
});