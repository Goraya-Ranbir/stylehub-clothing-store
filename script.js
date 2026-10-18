const products = [
  {id:1,name:"Classic White T-Shirt",category:"Men",price:499,oldPrice:799,badge:"Bestseller",rating:"4.9",reviews:124,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"},
  {id:2,name:"Floral Summer Dress",category:"Women",price:1199,oldPrice:1599,badge:"New drop",rating:"4.8",reviews:98,image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85"},
  {id:3,name:"Classic Denim Jacket",category:"Men",price:1499,oldPrice:1999,badge:"Trending",rating:"4.7",reviews:76,image:"https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=85"},
  {id:4,name:"Everyday Sneakers",category:"Accessories",price:1799,oldPrice:2299,badge:"Popular",rating:"4.9",reviews:142,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"},
  {id:5,name:"Weekend Hoodie",category:"Men",price:999,oldPrice:1299,badge:"Everyday",rating:"4.6",reviews:63,image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85"},
  {id:6,name:"Minimal Summer Top",category:"Women",price:699,oldPrice:899,badge:"Just in",rating:"4.8",reviews:85,image:"https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=700&q=85"},
  {id:7,name:"Relaxed Fit Jeans",category:"Men",price:1099,oldPrice:1499,badge:"Staff pick",rating:"4.7",reviews:91,image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85"},
  {id:8,name:"Everyday Handbag",category:"Accessories",price:1299,oldPrice:1699,badge:"New drop",rating:"4.8",reviews:57,image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85"}
];
let cart=[],wishlist=[],activeCategory="All",wishlistOnly=false,toastTimer;
const $=id=>document.getElementById(id);
const money=n=>"₹"+n.toLocaleString("en-IN");
function renderProducts(){
 let list=products.filter(p=>(p.name+" "+p.category).toLowerCase().includes($("search").value.trim().toLowerCase())&&(activeCategory==="All"||p.category===activeCategory)&&(!wishlistOnly||wishlist.includes(p.id)));
 if($("sort").value==="low")list.sort((a,b)=>a.price-b.price);
 if($("sort").value==="high")list.sort((a,b)=>b.price-a.price);
 $("results-label").textContent=wishlistOnly?"YOUR WISHLIST":activeCategory==="All"?"ALL PIECES":activeCategory.toUpperCase();
 $("results-count").textContent=`${list.length} ${list.length===1?"piece":"pieces"}`;
 $("product-grid").innerHTML=list.length?list.map((p,i)=>`<article class="product-card" style="animation-delay:${i*65}ms"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x700/f7f5ef/17232b?text=StyleHub'"><span class="product-badge">${p.badge}</span><button class="wish-btn ${wishlist.includes(p.id)?"liked":""}" onclick="toggleWishlist(${p.id})" aria-label="Toggle wishlist" aria-pressed="${wishlist.includes(p.id)}">${wishlist.includes(p.id)?"♥":"♡"}</button></div><div class="product-info"><p class="product-category">${p.category}</p><h3>${p.name}</h3><div class="product-rating">★★★★★ <small>${p.rating} (${p.reviews})</small></div><p class="product-price">${money(p.price)} <span class="old-price">${money(p.oldPrice)}</span></p><button class="add-button" onclick="addToCart(${p.id})">＋ Add to Bag</button></div></article>`).join(""):`<div class="empty-results">No pieces found. Try another search or category.</div>`;
}
function showToast(msg){clearTimeout(toastTimer);$("toast").textContent=msg;$("toast").classList.add("show");toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2300)}
function addToCart(id){let item=cart.find(x=>x.id===id);item?item.quantity++:cart.push({id,quantity:1});renderCart();showToast("Added to your bag");}
function changeQuantity(id,delta){let item=cart.find(x=>x.id===id);if(!item)return;item.quantity+=delta;if(item.quantity<1)cart=cart.filter(x=>x.id!==id);renderCart()}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);renderCart();showToast("Removed from your bag")}
function renderCart(){const count=cart.reduce((s,x)=>s+x.quantity,0),total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.quantity,0);$("cart-count").textContent=count;$("drawer-count").textContent=`(${count})`;$("cart-total").textContent=money(total);$("cart-items").innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p class="item-price">${money(p.price*x.quantity)}</p><div class="quantity-controls"><button onclick="changeQuantity(${p.id},-1)" aria-label="Decrease">−</button><span>${x.quantity}</span><button onclick="changeQuantity(${p.id},1)" aria-label="Increase">＋</button><button class="remove-btn" onclick="removeFromCart(${p.id})">Remove</button></div></div></div>`}).join(""):`<div class="empty-cart"><b>♡</b>Your bag is waiting for something lovely.</div>`}
function openCart(){$("scrim").classList.add("open");$("cart-drawer").classList.add("open");$("cart-drawer").setAttribute("aria-hidden","false");document.body.classList.add("drawer-open")}
function closeCart(){$("scrim").classList.remove("open");$("cart-drawer").classList.remove("open");$("cart-drawer").setAttribute("aria-hidden","true");document.body.classList.remove("drawer-open")}
function toggleWishlist(id){wishlist.includes(id)?wishlist=wishlist.filter(x=>x!==id):wishlist.push(id);renderProducts();showToast(wishlist.includes(id)?"Saved to favourites":"Removed from favourites")}
function showWishlist(){wishlistOnly=!wishlistOnly;activeCategory="All";document.querySelectorAll(".category-tile").forEach(b=>b.classList.toggle("selected",b.dataset.category==="All"));renderProducts();$("shop").scrollIntoView({behavior:"smooth"});if(wishlistOnly)showToast("Your saved favourites")}
document.querySelectorAll(".category-tile").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.category;wishlistOnly=false;document.querySelectorAll(".category-tile").forEach(x=>x.classList.toggle("selected",x===b));renderProducts();}));
document.querySelectorAll("[data-nav-category]").forEach(a=>a.addEventListener("click",()=>{activeCategory=a.dataset.navCategory;wishlistOnly=false;document.querySelectorAll(".category-tile").forEach(x=>x.classList.toggle("selected",x.dataset.category===activeCategory));renderProducts()}));
$("search").addEventListener("input",renderProducts);$("sort").addEventListener("change",renderProducts);
$("open-cart").addEventListener("click",openCart);$("close-cart").addEventListener("click",closeCart);$("scrim").addEventListener("click",closeCart);$("wishlist-view").addEventListener("click",showWishlist);
$("menu-toggle").addEventListener("click",()=>$("main-nav")?.classList.toggle("mobile-open"));
document.querySelector(".main-nav").id="main-nav";
$("checkout").addEventListener("click",()=>{if(!cart.length){showToast("Your bag is empty");return}alert("Demo order placed!\nTotal: "+money(cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.quantity,0))+"\n\nNo real payment was processed.");cart=[];renderCart();closeCart();showToast("Demo checkout complete")});
$("newsletter-form").addEventListener("submit",e=>{e.preventDefault();$("newsletter-status").textContent="Thanks for joining the Style Letter! (Demo only)";$("newsletter-form").reset()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
renderProducts();renderCart();
