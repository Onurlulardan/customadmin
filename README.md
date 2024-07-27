
# Yönetim Paneli

Bu proje, kişisel kullanım için hazırlanmış bir yönetim panelidir. İçerisinde Chakra UI ile yapılmış özelleştirilmiş bileşenler bulunur. Projedeki en önemli bileşenler `DataTable` ve `Form` bileşenleridir.

## Özellikler

- **Chakra UI İle Özelleştirilmiş Bileşenler**: Proje, Chakra UI kullanarak geliştirilmiş birçok özel bileşen içerir.
- **DataTable**: Göz alıcı ve kullanışlı bir veri tablosu bileşeni.
- **Form**: Dinamik form bileşeni, kullanıcı girdilerini kolayca yönetir ve işler.

## Kurulum

Projeyi klonlayın ve bağımlılıkları yükleyin:

```bash
git clone https://github.com/Onurlulardan/customadmin.git
cd customadmin
npm install
```

## Kullanım

Projeyi başlatmak için:

```bash
npm start
```

### Form Bileşeni

Form bileşeni, dinamik form oluşturma ve yönetme imkanı sağlar. Kullanıcıdan alınan girdiler, bileşen içinde otomatik olarak bir state objesinde toplanır ve `onSubmit` fonksiyonu ile işlenir. Form bileşeni içinde kullanılan bileşenler, form bileşenine özel props alarak özelleştirilir ve doğrulama yapılabilir.

#### Props

- **onSubmit (func)**: Form gönderildiğinde çağrılacak fonksiyon.
- **children (node)**: Form içinde yer alacak bileşenler.
- **buttonPositionX (string)**: Gönder butonunun yatay pozisyonu. Değerler: "left", "center", "right".
- **buttonPositionY (string)**: Gönder butonunun dikey pozisyonu. Değerler: "top", "bottom".
- **defaultButton (bool)**: Varsayılan gönder butonu ekleyip eklemeyeceğinizi belirler.
- **buttonLabel (string)**: Gönder butonunun etiketi.
- **colorScheme (string)**: Gönder butonunun renk şeması.

### Kullanım

1. **TextBox**: Metin girişi için kullanılır.
    - `label`: Bileşenin etiketi.
    - `name`: Bileşenin adı.
    - `placeholder`: Girdi alanı için yer tutucu.
    - `isRequired`: Girdinin zorunlu olup olmadığı.
    - `maxLength`: Maksimum karakter sayısı.
    - `helpText`: Yardımcı metin.
    - `showCharacterCount`: Karakter sayısını gösterme.

2. **NumberBox**: Sayısal değer girişi için kullanılır.
    - `label`: Bileşenin etiketi.
    - `name`: Bileşenin adı.
    - `placeholder`: Girdi alanı için yer tutucu.
    - `isRequired`: Girdinin zorunlu olup olmadığı.
    - `min`: Minimum değer.
    - `max`: Maksimum değer.
    - `precision`: Değerin hassasiyeti.
    - `step`: Adım değeri.
    - `helpText`: Yardımcı metin.

3. **TextArea**: Uzun metin girişi için kullanılır.
    - `label`: Bileşenin etiketi.
    - `name`: Bileşenin adı.
    - `placeholder`: Girdi alanı için yer tutucu.
    - `isRequired`: Girdinin zorunlu olup olmadığı.
    - `maxLength`: Maksimum karakter sayısı.
    - `helpText`: Yardımcı metin.
    - `showCharacterCount`: Karakter sayısını gösterme.

4. **AutoComplate**: Otomatik tamamlama özelliği olan seçim bileşeni.
    - `label`: Bileşenin etiketi.
    - `name`: Bileşenin adı.
    - `placeholder`: Girdi alanı için yer tutucu.
    - `options`: Seçenekler listesi.
    - `isMulti`: Çoklu seçim.
    - `isSearchable`: Arama özelliği.
    - `helpText`: Yardımcı metin.
    - `isRequired`: Girdinin zorunlu olup olmadığı.

5. **SelectBox**: Açılır kutu bileşeni.
    - `label`: Bileşenin etiketi.
    - `name`: Bileşenin adı.
    - `placeholder`: Girdi alanı için yer tutucu.
    - `options`: Seçenekler listesi.
    - `isRequired`: Girdinin zorunlu olup olmadığı.
    - `helpText`: Yardımcı metin.

6. **FileUpload**: Dosya yükleme bileşeni.
    - `label`: Bileşenin etiketi.
    - `name`: Bileşenin adı.
    - `acceptedFileTypes`: Kabul edilen dosya türleri.
    - `maxFileSize`: Maksimum dosya boyutu.
    - `isRequired`: Girdinin zorunlu olup olmadığı.
    - `valueType`: Dosya verisinin türü.
    - `helpText`: Yardımcı metin.

7. **DateTimePicker**: Tarih ve saat seçimi için kullanılır.
    - `label`: Bileşenin etiketi.
    - `name`: Bileşenin adı.
    - `placeholder`: Girdi alanı için yer tutucu.
    - `isRequired`: Girdinin zorunlu olup olmadığı.
    - `helpText`: Yardımcı metin.
    - `leftAddon`: Sol taraf ek bileşeni.
    - `setTodayAsDefault`: Bugünü varsayılan olarak ayarlama.
    - `includeTime`: Saat dahil etme.

8. **RadioGroup**: Radyo düğmeleri grubu.
    - `label`: Bileşenin etiketi.
    - `name`: Bileşenin adı.
    - `options`: Seçenekler listesi.
    - `isRequired`: Girdinin zorunlu olup olmadığı.
    - `helpText`: Yardımcı metin.
    - `defaultValue`: Varsayılan değer.

9. **SwitchGroup**: Anahtar bileşeni.
    - `label`: Bileşenin etiketi.
    - `name`: Bileşenin adı.
    - `helpText`: Yardımcı metin.
    - `defaultValue`: Varsayılan değer.

10. **CheckboxGroup**: Onay kutuları grubu.
    - `label`: Bileşenin etiketi.
    - `name`: Bileşenin adı.
    - `options`: Seçenekler listesi.
    - `isRequired`: Girdinin zorunlu olup olmadığı.
    - `helpText`: Yardımcı metin.
    - `defaultValue`: Varsayılan değer.

### DataTable Bileşeni

`DataTable` bileşeni, veri tablolarını yönetmek ve kullanıcıya çekici bir arayüz sunmak için kullanılır. Sütun bilgilerine göre veri ekleme ve düzenleme işlemleri otomatik olarak yapılabilir. `DataTableForm` bileşeni kullanılarak drawer veya modalda veri ekleme işlemi gerçekleştirilir.

#### Props

- **columns (array)**: Tablonun sütunlarını tanımlar. Her sütun için `key`, `header`, `type`, `isRequired` gibi özellikler belirtilir.
- **data (array)**: Tablo verileri.
- **contextMenuItems (array)**: Satırlara sağ tıklama menüsü eklemek için öğeler.
- **toolbarButtons (array)**: Tablo üzerinde çeşitli araç çubuğu düğmeleri eklemek için öğeler.
- **onDataChange (func)**: Veri değişikliklerinde çağrılacak fonksiyon.
- **onItemClick (func)**: Context menü öğesine tıklandığında çağrılacak fonksiyon.
- **onToolbarButtonClick (func)**: Araç çubuğu düğmesine tıklandığında çağrılacak fonksiyon.
- **onSave (func)**: Veri kaydedildiğinde çağrılacak fonksiyon.
- **showOn (string)**: Veri ekleme/düzenleme formunun nasıl gösterileceği. Değerler: `"drawer"`, `"modal"`.

Daha fazla bilgi ve bileşenlerin detayları için proje dosyalarını inceleyebilirsiniz.
