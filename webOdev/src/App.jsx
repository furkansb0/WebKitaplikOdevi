import React, { useState, useEffect, useMemo, useCallback } from 'react';

const AramaSimgesi = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const KalpSimgesi = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={props.fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 1.01-4.5 2-1.5-1-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const ListeSimgesi = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="6" x2="21" y2="6"/><line x1="12" y1="12" x2="21" y2="12"/><line x1="12" y1="18" x2="21" y2="18"/><path d="M7 6h.01"/><path d="M7 12h.01"/><path d="M7 18h.01"/></svg>
);
const KapatSimgesi = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const KitapSimgesi = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
);
const AsagiOkSimgesi = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

const initialBooks = [
  { id: 1, baslik: 'Sineklerin Tanrısı', yazar: 'William Golding', kategori: 'Edebiyat' },
  { id: 2, baslik: 'Dune', yazar: 'Frank Herbert', kategori: 'Bilim Kurgu' },
  { id: 3, baslik: 'Savaş ve Barış', yazar: 'Leo Tolstoy', kategori: 'Tarih' },
  { id: 4, baslik: 'Küçük Prens', yazar: 'Antoine de Saint-Exupéry', kategori: 'Edebiyat' },
  { id: 5, baslik: 'Bir İdam Mahkumunun Son Günü', yazar: 'Victor Hugo', kategori: 'Edebiyat' },
  { id: 6, baslik: 'Otostopçunun Galaksi Rehberi', yazar: 'Douglas Adams', kategori: 'Bilim Kurgu' },
  { id: 7, baslik: 'İnsan Ne İle Yaşar?', yazar: 'Lev Tolstoy', kategori: 'Kişisel Gelişim' },
  { id: 8, baslik: 'Homo Deus', yazar: 'Yuval Noah Harari', kategori: 'Tarih' },
  { id: 9, baslik: 'Uçurtma Avcısı', yazar: 'Khaled Hosseini', kategori: 'Edebiyat' },
];

const categories = ['Hepsi', ...new Set(initialBooks.map(b => b.kategori))];

function useLocalStorage(anahtar, baslangicDegeri) {
  const [saklananDeger, setSaklananDeger] = useState(() => {
    try {
     
      const eleman = window.localStorage.getItem(anahtar);
      return eleman ? JSON.parse(eleman) : baslangicDegeri;
    } catch (hata) {
      console.error('LocalStorage okuma hatası:', hata);
      return baslangicDegeri;
    }
  });

  const degerAyarla = useCallback((yeniDeger) => {
    try {
      const yazilacakDeger = yeniDeger instanceof Function ? yeniDeger(saklananDeger) : yeniDeger;
      setSaklananDeger(yazilacakDeger);
     
      window.localStorage.setItem(anahtar, JSON.stringify(yazilacakDeger));
    } catch (hata) {
      console.error('LocalStorage yazma hatası:', hata);
    }
  }, [anahtar, saklananDeger]);

  return [saklananDeger, degerAyarla];
}

const FavoriPaneli = React.memo(({ books, favoriIdler, favoriAcKapa }) => {
  const favoriKitaplar = useMemo(() => 
    books.filter(kitap => favoriIdler.includes(kitap.id))
  , [books, favoriIdler]);

  return (
    <div className="absolute top-0 right-0 m-4 w-64 max-h-[70vh] bg-white rounded-lg shadow-xl p-3 border-t-4 border-red-500 overflow-y-auto">
      <div className="flex items-center mb-3 pb-2 border-b border-gray-100">
        <KalpSimgesi className="w-5 h-5 mr-2 text-red-600 fill-red-500" />
        <h3 className="text-lg font-bold text-gray-800">
          Favoriler ({favoriKitaplar.length})
        </h3>
      </div>

      {favoriKitaplar.length === 0 ? (
        <p className="text-gray-500 italic text-sm text-center py-2">
          Favori listeniz boş. Bir kitap ekleyin!
        </p>
      ) : (
        <ul className="space-y-2">
          {favoriKitaplar.map(kitap => (
            <li 
              key={kitap.id} 
              className="p-2 bg-red-50 rounded-lg flex justify-between items-center transition-colors hover:bg-red-100"
            >
              <span className="font-medium text-gray-800 text-sm truncate">{kitap.baslik}</span>
              <button
                onClick={() => favoriAcKapa(kitap.id)}
                className="text-red-500 hover:text-red-700 p-1 transition-colors"
                aria-label={`${kitap.baslik} kitabını favorilerden çıkar`}
                title="Favorilerden Çıkar"
              >
                <KapatSimgesi className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

const KitapKartı = React.memo(({ baslik, yazar, kategori, id, favorideMi, favoriAcKapa }) => {
  const favoriDugmesineBas = useCallback(() => {
    favoriAcKapa(id);
  }, [id, favoriAcKapa]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between border-t-4 border-indigo-500">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{baslik}</h3>
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Yazar:</span> {yazar}
        </p>
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
          {kategori}
        </span>
      </div>
      
      <button
        onClick={favoriDugmesineBas}
        className={`mt-4 w-full flex items-center justify-center py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
          favorideMi
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        <KalpSimgesi className="w-4 h-4 mr-2" fill={favorideMi ? 'white' : 'transparent'} />
        {favorideMi ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
      </button>
    </div>
  );
});

const KitapListe = React.memo(({ kitaplar, favoriIdler, favoriAcKapa }) => {
  if (kitaplar.length === 0) 
    return (
      <div className="text-center py-10">
        <KitapSimgesi className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-lg text-gray-600">Aradığınız kriterlere uygun kitap bulunamadı.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {kitaplar.map(kitap => (
        <KitapKartı
          key={kitap.id}
          {...kitap}
          favorideMi={favoriIdler.includes(kitap.id)}
          favoriAcKapa={favoriAcKapa}
        />
      ))}
    </div>
  );
});

const KategoriFiltre = React.memo(({ kategori, setKategori }) => {
  const degisimYoneticisi = useCallback((e) => {
    setKategori(e.target.value);
  }, [setKategori]);

  return (
    <div className="relative">
      <select
        value={kategori}
        onChange={degisimYoneticisi}
        className="block w-full md:w-64 appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 shadow-sm transition-colors"
        aria-label="Kategoriye göre filtrele"
      >
        {categories.map(cat => (
          <option key={cat} value={cat === 'Hepsi' ? '' : cat}>
            {cat}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <AsagiOkSimgesi className="w-4 h-4" />
      </div>
    </div>
  );
});

const AramaCubugu = React.memo(({ aramaMetni, setAramaMetni }) => {
  const degisimYoneticisi = useCallback((e) => {
    setAramaMetni(e.target.value);
  }, [setAramaMetni]);

  const temizle = useCallback(() => {
    setAramaMetni('');
  }, [setAramaMetni]);

  return (
    <div className="relative flex items-center w-full max-w-xl">
      <AramaSimgesi className="absolute left-4 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Kitap başlığına göre arama yapın..."
        value={aramaMetni}
        onChange={degisimYoneticisi}
        className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow"
      />
      {aramaMetni && (
        <button
          onClick={temizle}
          className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
          aria-label="Arama metnini temizle"
        >
          <KapatSimgesi className="w-5 h-5" />
        </button>
      )}
    </div>
  );
});

const App = () => {
  
  const [aramaMetni, setAramaMetni] = useLocalStorage('kitaplikAramaMetni', '');
  const [kategori, setKategori] = useLocalStorage('kitaplikKategori', ''); 
  const [favoriler, setFavoriler] = useLocalStorage('kitaplikFavoriler', []); 

 
  const favoriAcKapa = useCallback((id) => {
    setFavoriler(oncekiFavoriler => {
      if (oncekiFavoriler.includes(id)) {
       
        return oncekiFavoriler.filter(favId => favId !== id);
      } else {
        
        return [...oncekiFavoriler, id];
      }
    });
  }, [setFavoriler]);


  const filtrelenmisKitaplar = useMemo(() => {
    const kucukAramaMetni = aramaMetni.toLowerCase().trim();

    return initialBooks.filter(kitap => {
      
      const aramaEslesiyor = kucukAramaMetni === '' || 
                            kitap.baslik.toLowerCase().includes(kucukAramaMetni);

      const kategoriEslesiyor = kategori === '' || kitap.kategori === kategori;

      return aramaEslesiyor && kategoriEslesiyor;
    });
  }, [aramaMetni, kategori]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <header className="text-center py-8 mb-8 bg-white rounded-xl shadow-md">
        <h1 className="text-4xl font-extrabold text-indigo-700 flex items-center justify-center">
          <KitapSimgesi className="w-8 h-8 mr-3" />
          Kulüp Web Kitaplığı
        </h1>
        <p className="text-lg text-gray-500 mt-2">Ara, filtrele ve favorilere ekle!</p>
      </header>

      {/* Favori Paneli'ni buraya taşıdık, App div'ine göre konumlanacak */}
      <FavoriPaneli books={initialBooks} favoriIdler={favoriler} favoriAcKapa={favoriAcKapa} />


      <main className="max-w-7xl mx-auto">
        {/* Kontrol Çubuğu */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 p-6 bg-white rounded-xl shadow-lg">
          <AramaCubugu aramaMetni={aramaMetni} setAramaMetni={setAramaMetni} />
          <KategoriFiltre kategori={kategori} setKategori={setKategori} />
        </div>
        
        {/* Kitap Listesi */}
        <KitapListe 
          kitaplar={filtrelenmisKitaplar} 
          favoriIdler={favoriler}
          favoriAcKapa={favoriAcKapa} 
        />
      </main>

    </div>
  );
};

export default App;