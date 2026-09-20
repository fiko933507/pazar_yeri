import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const C = {
  blue: '#123FBB', orange: '#FF641E', yellow: '#FFD529', ink: '#102044',
  teal: '#008D9D', cream: '#FFFDF8', paper: '#F7F5EF', muted: '#667085', line: '#E9E7E1',
};

type Product = {
  id: number; title: string; maker: string; price: number; image: string;
  category: string; progress?: number; days?: number; description: string;
};

const products: Product[] = [
  { id: 1, title: 'Dalga Seramik Kase', maker: 'Toprak İzleri', price: 390, category: 'Ev & Yaşam', progress: 72, days: 3, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85', description: 'Tamamen elde şekillendirilen, her biri kendine özgü desen taşıyan sınırlı üretim seramik kase.' },
  { id: 2, title: 'Limon Nakışlı Bez Çanta', maker: 'Atölye Limon', price: 450, category: 'Aksesuar', progress: 58, days: 5, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=900&q=85', description: 'Pamuklu kumaş üzerine elde işlenen, günlük kullanıma uygun dayanıklı bez çanta.' },
  { id: 3, title: 'Doğal Soya Mum', maker: 'Mumla Güzel', price: 280, category: 'Ev & Yaşam', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85', description: 'Doğal soya wax ve bitkisel esanslarla küçük partiler halinde elde dökülür.' },
  { id: 4, title: 'Makrome Bitki Askısı', maker: 'Evde Bohem', price: 320, category: 'Dekorasyon', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85', description: 'Geri dönüştürülmüş pamuk ipten, sipariş üzerine elde düğümlenen bitki askısı.' },
];

const categories = ['Tümü', 'Ev & Yaşam', 'Mutfak', 'Aksesuar', 'Dekorasyon'];
const tabs = [
  ['home', 'Ana Sayfa'], ['search', 'Keşfet'], ['heart', 'Favoriler'],
  ['chatbubble-outline', 'Mesajlar'], ['person-outline', 'Hesabım'],
] as const;

function Logo() {
  return <View style={s.logoWrap}><View style={s.logoRays}><View style={s.ray}/><View style={[s.ray,s.ray2]}/><View style={[s.ray,s.ray3]}/></View><Text style={s.logo}>PAZAR</Text><Text style={s.tagline}>Ev yapımı. Gerçek üretici.</Text></View>;
}

function Progress({ value }: { value: number }) {
  return <View style={s.progressTrack}><View style={[s.progressFill, { width: `${value}%` }]} /></View>;
}

function ProductCard({ item, onOpen, onFav, favorite }: { item: Product; onOpen: () => void; onFav: () => void; favorite: boolean }) {
  return <Pressable style={s.productCard} onPress={onOpen}>
    <View><Image source={{ uri: item.image }} style={s.productImage}/><Pressable style={s.heart} onPress={onFav}><Ionicons name={favorite ? 'heart' : 'heart-outline'} size={19} color={favorite ? C.orange : 'white'}/></Pressable><View style={s.newBadge}><Text style={s.newBadgeText}>Yeni</Text></View></View>
    <Text style={s.productTitle} numberOfLines={1}>{item.title}</Text><Text style={s.maker}>{item.maker}</Text>
    <View style={s.priceRow}><Text style={s.price}>₺{item.price}</Text><Pressable style={s.addButton} onPress={onOpen}><Ionicons name="add" size={22} color="white"/></Pressable></View>
  </Pressable>;
}

function Home({ openProduct, favorites, toggleFavorite }: { openProduct: (p: Product) => void; favorites: number[]; toggleFavorite: (id:number)=>void }) {
  const [category, setCategory] = useState('Tümü');
  const [query, setQuery] = useState('');
  const visible = useMemo(() => products.filter(p => (category === 'Tümü' || p.category === category) && `${p.title} ${p.maker}`.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr'))), [category, query]);
  return <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollBody}>
    <View style={s.header}><Logo/><Pressable style={s.bell} onPress={() => Alert.alert('Bildirimler', 'Yeni bir bildirimin yok.')}><Ionicons name="notifications-outline" size={25} color={C.ink}/><View style={s.dot}/></Pressable></View>
    <View style={s.search}><Ionicons name="search" size={21} color={C.muted}/><TextInput value={query} onChangeText={setQuery} placeholder="Ne aramıştın?" placeholderTextColor="#9499A5" style={s.searchInput}/><Ionicons name="options-outline" size={21} color={C.ink}/></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.categories}>{categories.map((x,i)=><Pressable key={x} onPress={()=>setCategory(x)} style={[s.category,category===x&&s.categoryActive]}><Ionicons name={(i===0?'grid':i===1?'home-outline':i===2?'restaurant-outline':i===3?'bag-handle-outline':'color-palette-outline') as never} size={17} color={category===x?C.ink:C.muted}/><Text style={[s.categoryText,category===x&&s.categoryTextActive]}>{x}</Text></Pressable>)}</ScrollView>
    <LinearGradient colors={[C.orange,'#FF8A24']} start={{x:0,y:0}} end={{x:1,y:1}} style={s.hero}>
      <View style={s.heroCopy}><View style={s.bluePill}><Text style={s.bluePillText}>Yeni düşenler</Text></View><Text style={s.heroTitle}>Bugünün{`\n`}üreticileri,{`\n`}yarın senin{`\n`}favorilerin.</Text><Pressable style={s.heroArrow} onPress={()=>openProduct(products[0])}><Ionicons name="arrow-forward" size={24} color={C.blue}/></Pressable></View>
      <Image source={{uri: products[0].image}} style={s.heroImage}/><Text style={s.heroNote}>Küçük atölyeler,{`\n`}büyük hikâyeler.</Text>
    </LinearGradient>
    <View style={s.quickRow}>
      {[['Evine emek kat',products[0],C.paper],['Günün hediye fikirleri',products[1],'#FFE2D8'],['Sadece ev yapımı',products[3],'#CDEEF0']].map(([title,p,bg])=><Pressable key={title as string} style={[s.quickCard,{backgroundColor:bg as string}]} onPress={()=>openProduct(p as Product)}><Text style={s.quickTitle}>{title as string}</Text><Image source={{uri:(p as Product).image}} style={s.quickImage}/><View style={s.smallArrow}><Ionicons name="arrow-forward" color={C.blue} size={16}/></View></Pressable>)}
    </View>
    <View style={s.sectionHead}><View style={s.titleWithIcon}><Ionicons name="flash" color={C.orange} size={24}/><Text style={s.sectionTitle}>Ön siparişler</Text></View><Pressable><Text style={s.seeAll}>Tümünü gör  →</Text></Pressable></View>
    {products.filter(p=>p.progress).map(p=><Pressable key={p.id} style={s.preorder} onPress={()=>openProduct(p)}><Image source={{uri:p.image}} style={s.preorderImage}/><View style={s.preorderBody}><View style={s.limited}><Text style={s.limitedText}>Sınırlı üretim</Text></View><Text style={s.preorderTitle}>{p.title}</Text><Progress value={p.progress!}/><View style={s.preorderMeta}><Text style={s.percent}>%{p.progress} tamamlandı</Text><Text style={s.days}>{p.days} gün kaldı</Text></View></View><View style={s.roundOrange}><Ionicons name="arrow-forward" color="white" size={18}/></View></Pressable>)}
    <View style={s.sectionHead}><Text style={s.sectionTitle}>{query || category !== 'Tümü' ? 'Sonuçlar' : 'Yeni ürünler'}</Text><Text style={s.seeAll}>{visible.length} ürün</Text></View>
    <View style={s.grid}>{visible.map(p=><ProductCard key={p.id} item={p} onOpen={()=>openProduct(p)} favorite={favorites.includes(p.id)} onFav={()=>toggleFavorite(p.id)}/>)}</View>
  </ScrollView>;
}

function EmptyScreen({ tab, favorites, openProduct }: { tab:string; favorites:number[]; openProduct:(p:Product)=>void }) {
  if (tab === 'Favoriler' && favorites.length) return <ScrollView contentContainerStyle={s.simplePage}><Text style={s.pageTitle}>Favorilerin</Text><Text style={s.pageText}>Kalbine dokunan ev yapımı ürünler burada.</Text><View style={s.grid}>{products.filter(p=>favorites.includes(p.id)).map(p=><ProductCard key={p.id} item={p} onOpen={()=>openProduct(p)} favorite onFav={()=>{}}/>)}</View></ScrollView>;
  const icon = tab==='Keşfet'?'compass-outline':tab==='Mesajlar'?'chatbubbles-outline':tab==='Hesabım'?'person-circle-outline':'heart-outline';
  return <View style={s.empty}><View style={s.emptyIcon}><Ionicons name={icon as never} size={48} color={C.blue}/></View><Text style={s.pageTitle}>{tab}</Text><Text style={s.pageText}>{tab==='Keşfet'?'Yeni üreticiler ve eşsiz ürünler yakında burada.':tab==='Mesajlar'?'Üreticilerle konuşmaların burada görünecek.':tab==='Hesabım'?'Siparişlerini ve mağazanı buradan yönetebilirsin.':'Henüz favori ürünün yok.'}</Text></View>;
}

export default function App() {
  const [tab,setTab]=useState('Ana Sayfa'); const [selected,setSelected]=useState<Product|null>(null); const [favorites,setFavorites]=useState<number[]>([]); const [cart,setCart]=useState(0);
  const toggleFavorite=(id:number)=>setFavorites(x=>x.includes(id)?x.filter(v=>v!==id):[...x,id]);
  return <SafeAreaView style={s.safe}><StatusBar barStyle="dark-content" backgroundColor={C.cream}/><View style={s.app}>
    {tab==='Ana Sayfa'?<Home openProduct={setSelected} favorites={favorites} toggleFavorite={toggleFavorite}/>:<EmptyScreen tab={tab} favorites={favorites} openProduct={setSelected}/>} 
    <View style={s.bottom}>{tabs.map(([icon,label])=><Pressable key={label} onPress={()=>setTab(label)} style={s.tab}><View><Ionicons name={(tab===label&&icon==='home'?'home':tab===label&&icon==='heart'?'heart':icon) as never} size={23} color={tab===label?C.blue:'#687086'}/>{label==='Favoriler'&&favorites.length>0?<View style={s.counter}><Text style={s.counterText}>{favorites.length}</Text></View>:null}</View><Text style={[s.tabText,tab===label&&s.tabActive]}>{label}</Text></Pressable>)}</View>
    <Modal visible={!!selected} animationType="slide" transparent onRequestClose={()=>setSelected(null)}>{selected?<View style={s.modalShade}><View style={s.sheet}><Pressable style={s.close} onPress={()=>setSelected(null)}><Ionicons name="close" size={24} color={C.ink}/></Pressable><Image source={{uri:selected.image}} style={s.detailImage}/><View style={s.detailBody}><View style={s.detailTop}><View style={{flex:1}}><Text style={s.detailTitle}>{selected.title}</Text><Text style={s.detailMaker}>{selected.maker} · Ev üreticisi</Text></View><Pressable onPress={()=>toggleFavorite(selected.id)}><Ionicons name={favorites.includes(selected.id)?'heart':'heart-outline'} size={27} color={C.orange}/></Pressable></View><Text style={s.detailPrice}>₺{selected.price}</Text><Text style={s.detailDesc}>{selected.description}</Text><View style={s.trustRow}><View style={s.trust}><Ionicons name="hand-left-outline" size={20} color={C.blue}/><Text style={s.trustText}>El yapımı</Text></View><View style={s.trust}><Ionicons name="shield-checkmark-outline" size={20} color={C.blue}/><Text style={s.trustText}>Doğrulanmış üretici</Text></View></View><Pressable style={s.cartButton} onPress={()=>{setCart(v=>v+1);setSelected(null);Alert.alert('Sepete eklendi',`${selected.title} sepetine eklendi.`)}}><Text style={s.cartText}>Sepete ekle · ₺{selected.price}</Text></Pressable></View></View></View>:null}</Modal>
    {cart>0?<View style={s.cartBubble}><Ionicons name="bag-handle" size={20} color="white"/><Text style={s.cartCount}>{cart}</Text></View>:null}
  </View></SafeAreaView>;
}

const s=StyleSheet.create({
  safe:{flex:1,backgroundColor:C.cream},app:{flex:1,backgroundColor:C.cream},scrollBody:{paddingBottom:110},header:{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:10,paddingHorizontal:18},logoWrap:{alignItems:'center'},logo:{fontSize:35,fontWeight:'900',fontStyle:'italic',color:C.blue,letterSpacing:-2},tagline:{fontSize:11,color:C.blue,fontWeight:'700',marginTop:-5},logoRays:{position:'absolute',left:-15,top:2},ray:{position:'absolute',height:9,width:4,borderRadius:4,backgroundColor:C.orange,transform:[{rotate:'-25deg'}]},ray2:{left:-5,top:-3,transform:[{rotate:'0deg'}]},ray3:{left:-10,top:10,transform:[{rotate:'-60deg'}]},bell:{position:'absolute',right:19,top:18,padding:6},dot:{position:'absolute',right:6,top:5,width:7,height:7,borderRadius:4,backgroundColor:C.orange,borderWidth:1,borderColor:'white'},search:{margin:17,marginBottom:8,height:50,borderRadius:16,borderWidth:1,borderColor:C.line,backgroundColor:'white',flexDirection:'row',alignItems:'center',paddingHorizontal:15,gap:10},searchInput:{flex:1,fontSize:15,color:C.ink},categories:{paddingHorizontal:17,gap:8,paddingBottom:14},category:{height:43,paddingHorizontal:13,borderRadius:14,backgroundColor:'white',flexDirection:'row',alignItems:'center',gap:6,borderWidth:1,borderColor:'#F0EFEA'},categoryActive:{backgroundColor:C.yellow,borderColor:C.yellow},categoryText:{fontSize:12,color:C.muted,fontWeight:'600'},categoryTextActive:{color:C.ink,fontWeight:'800'},hero:{marginHorizontal:17,height:265,borderRadius:25,overflow:'hidden',flexDirection:'row'},heroCopy:{padding:20,zIndex:2,width:'58%'},bluePill:{alignSelf:'flex-start',backgroundColor:C.blue,borderRadius:8,paddingHorizontal:10,paddingVertical:6},bluePillText:{color:'white',fontWeight:'800',fontSize:13},heroTitle:{fontSize:27,lineHeight:28,color:'white',fontWeight:'900',marginTop:12,letterSpacing:-.8},heroArrow:{position:'absolute',bottom:18,left:20,width:43,height:43,borderRadius:22,backgroundColor:'white',alignItems:'center',justifyContent:'center'},heroImage:{position:'absolute',right:0,width:'52%',height:'100%'},heroNote:{position:'absolute',right:8,top:17,color:'white',fontSize:12,fontStyle:'italic',fontWeight:'700',transform:[{rotate:'-4deg'}],textAlign:'center'},quickRow:{paddingHorizontal:17,marginTop:12,flexDirection:'row',gap:9},quickCard:{flex:1,height:145,borderRadius:18,overflow:'hidden'},quickTitle:{fontSize:14,fontWeight:'900',color:C.ink,padding:11,zIndex:2},quickImage:{position:'absolute',bottom:0,width:'100%',height:95},smallArrow:{position:'absolute',left:9,bottom:8,width:28,height:28,borderRadius:14,backgroundColor:'white',alignItems:'center',justifyContent:'center'},sectionHead:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:18,marginTop:25,marginBottom:10},titleWithIcon:{flexDirection:'row',alignItems:'center',gap:7},sectionTitle:{fontSize:21,fontWeight:'900',color:C.ink},seeAll:{fontSize:12,color:C.muted,fontWeight:'600'},preorder:{marginHorizontal:17,marginBottom:10,borderWidth:1,borderColor:C.line,borderRadius:18,padding:10,backgroundColor:'white',flexDirection:'row',alignItems:'center'},preorderImage:{width:76,height:76,borderRadius:14},preorderBody:{flex:1,paddingHorizontal:11},limited:{alignSelf:'flex-start',paddingHorizontal:7,paddingVertical:3,borderRadius:6,backgroundColor:'#FFE0D2'},limitedText:{fontSize:10,color:C.orange,fontWeight:'800'},preorderTitle:{fontSize:14,fontWeight:'800',color:C.ink,marginVertical:5},progressTrack:{height:7,borderRadius:5,backgroundColor:'#E9E9EB',overflow:'hidden'},progressFill:{height:'100%',backgroundColor:C.orange,borderRadius:5},preorderMeta:{flexDirection:'row',justifyContent:'space-between',marginTop:5},percent:{fontSize:10,fontWeight:'800',color:C.ink},days:{fontSize:10,color:C.muted},roundOrange:{width:34,height:34,borderRadius:17,backgroundColor:C.orange,alignItems:'center',justifyContent:'center'},grid:{paddingHorizontal:17,flexDirection:'row',flexWrap:'wrap',gap:10},productCard:{width:'48.4%',backgroundColor:'white',borderRadius:18,padding:8,borderWidth:1,borderColor:C.line},productImage:{width:'100%',height:145,borderRadius:13},heart:{position:'absolute',right:7,top:7,width:30,height:30,borderRadius:15,backgroundColor:'rgba(16,32,68,.45)',alignItems:'center',justifyContent:'center'},newBadge:{position:'absolute',left:7,bottom:7,backgroundColor:C.yellow,paddingHorizontal:7,paddingVertical:3,borderRadius:7},newBadgeText:{fontSize:10,fontWeight:'900',color:C.ink},productTitle:{fontSize:13,fontWeight:'800',color:C.ink,marginTop:8},maker:{fontSize:11,color:C.muted,marginTop:2},priceRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:7},price:{fontSize:16,fontWeight:'900',color:C.ink},addButton:{width:32,height:32,borderRadius:16,backgroundColor:C.orange,alignItems:'center',justifyContent:'center'},bottom:{position:'absolute',left:0,right:0,bottom:0,height:78,paddingTop:9,paddingBottom:10,backgroundColor:'white',borderTopWidth:1,borderColor:C.line,flexDirection:'row',justifyContent:'space-around'},tab:{width:'20%',alignItems:'center',gap:3},tabText:{fontSize:10,color:'#687086'},tabActive:{color:C.blue,fontWeight:'800'},counter:{position:'absolute',right:-9,top:-5,minWidth:16,height:16,borderRadius:8,backgroundColor:C.orange,alignItems:'center',justifyContent:'center'},counterText:{color:'white',fontSize:9,fontWeight:'900'},simplePage:{paddingTop:40,paddingBottom:110},empty:{flex:1,alignItems:'center',justifyContent:'center',paddingHorizontal:45,paddingBottom:70},emptyIcon:{width:92,height:92,borderRadius:30,backgroundColor:'#E9EFFF',alignItems:'center',justifyContent:'center',marginBottom:19},pageTitle:{fontSize:29,fontWeight:'900',color:C.ink,paddingHorizontal:17},pageText:{fontSize:15,lineHeight:22,color:C.muted,textAlign:'center',marginTop:8,marginBottom:24,paddingHorizontal:17},modalShade:{flex:1,backgroundColor:'rgba(8,18,42,.42)',justifyContent:'flex-end'},sheet:{backgroundColor:C.cream,borderTopLeftRadius:28,borderTopRightRadius:28,overflow:'hidden',maxHeight:'90%'},close:{position:'absolute',right:16,top:16,zIndex:3,width:38,height:38,borderRadius:19,backgroundColor:'white',alignItems:'center',justifyContent:'center'},detailImage:{width:'100%',height:315},detailBody:{padding:20,paddingBottom:30},detailTop:{flexDirection:'row',alignItems:'center'},detailTitle:{fontSize:25,fontWeight:'900',color:C.ink},detailMaker:{fontSize:13,color:C.muted,marginTop:4},detailPrice:{fontSize:23,fontWeight:'900',color:C.orange,marginTop:13},detailDesc:{fontSize:14,lineHeight:21,color:'#4A5368',marginTop:9},trustRow:{flexDirection:'row',gap:9,marginVertical:17},trust:{flex:1,backgroundColor:'#EAF0FF',borderRadius:13,padding:10,flexDirection:'row',alignItems:'center',gap:6},trustText:{fontSize:11,color:C.blue,fontWeight:'700'},cartButton:{height:54,borderRadius:16,backgroundColor:C.orange,alignItems:'center',justifyContent:'center'},cartText:{color:'white',fontSize:16,fontWeight:'900'},cartBubble:{position:'absolute',right:15,bottom:90,width:47,height:47,borderRadius:24,backgroundColor:C.blue,alignItems:'center',justifyContent:'center',borderWidth:3,borderColor:'white'},cartCount:{position:'absolute',right:-2,top:-5,backgroundColor:C.orange,color:'white',fontSize:10,fontWeight:'900',minWidth:18,height:18,borderRadius:9,textAlign:'center',lineHeight:18}
});
