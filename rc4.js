const buton = document.querySelector(".buton");

var anahtar = "", metin = "", sonuc = "";

buton.addEventListener("click", function(){
    const duyuru = document.querySelector(".duyuru");
    anahtar = document.querySelector("#key").value;
    metin = document.querySelector("#plaintext").value;

    if(anahtar == "" || metin == ""){
        duyuru.classList.replace("basarili", "basarisiz");
        duyuru.innerHTML = "Anahtar ve metin boş bırakılamaz."
    }
    else{
        duyuru.classList.replace("basarisiz", "basarili");
        duyuru.innerHTML = "Metin başarı ile şifrelendi."

        sonuc = rc4(anahtar,metin);
        document.querySelector("#sonuc").value = sonuc;
    }

    
});

function rc4(anahtar, metin) {

	var s = [], a = [], j = 0, temp, sonuc = '';


	for (var i = 0; i < 256; i++) {
		s[i] = i;
        a[i] = anahtar.charCodeAt(i % anahtar.length);
	}

	for (i = 0; i < 256; i++) {
		j = (j + s[i] + a[i]) % 256;
		temp = s[i];
		s[i] = s[j];
		s[j] = temp;
	}

	i = 0;
	j = 0;


	for (var k = 0; k < metin.length; k++) {
		i = (i + 1) % 256;
		j = (j + s[i]) % 256;
		temp = s[i];
		s[i] = s[j];
		s[j] = temp;
        let xor = metin.charCodeAt(k) ^ s[(s[i] + s[j]) % 256];
		sonuc += String.fromCharCode(xor);
	}

	return sonuc;
}

