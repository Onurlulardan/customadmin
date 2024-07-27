# Yönetim Paneli

Bu proje, kişisel kullanım için hazırlanmış bir yönetim panelidir. İçerisinde Chakra UI ile yapılmış özelleştirilmiş bileşenler bulunur. Projedeki en önemli bileşenler `DataTable` ve `Form` bileşenleridir.

[Demo](https://customadmin.vercel.app/admin/dashboard).

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

```bash
// Form bileşeni onSubmit eventinde bileşen içindeki childrenlardan aldığı verileri geri döner
const handleSubmit = (values) => {
    console.log("Form values:", values);
    alert(JSON.stringify(values, null, 2));
};
```

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

```bash
<TextBox
    label="İsim"
    name="name"
    placeholder="İsminizi girin"
    isRequired={true}
    maxLength={20}
    helpText="Tam isminiz"
    showCharacterCount={true}
    leftAddon="#"
    defaultValue="onur"
/>
```

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

```bash
<NumberBox
    label="Yaş"
    name="age"
    placeholder="Yaşınızı girin"
    isRequired={true}
    min={0}
    max={120}
    precision={2}
    step={0.2}
    helpText="Yaşınız"
/>
```

3. **TextArea**: Uzun metin girişi için kullanılır.

   - `label`: Bileşenin etiketi.
   - `name`: Bileşenin adı.
   - `placeholder`: Girdi alanı için yer tutucu.
   - `isRequired`: Girdinin zorunlu olup olmadığı.
   - `maxLength`: Maksimum karakter sayısı.
   - `helpText`: Yardımcı metin.
   - `showCharacterCount`: Karakter sayısını gösterme.

```bash
<TextArea
    label="Açıklama"
    name="description"
    placeholder="Açıklamanızı girin"
    isRequired={true}
    maxLength={100}
    helpText="Açıklamanız"
    showCharacterCount={true}
/>
```

4. **AutoComplate**: Otomatik tamamlama özelliği olan seçim bileşeni.

   - `label`: Bileşenin etiketi.
   - `name`: Bileşenin adı.
   - `placeholder`: Girdi alanı için yer tutucu.
   - `options`: Seçenekler listesi.
   - `isMulti`: Çoklu seçim.
   - `isSearchable`: Arama özelliği.
   - `helpText`: Yardımcı metin.
   - `isRequired`: Girdinin zorunlu olup olmadığı.

```bash
<AutoComplate
    label="Cinsiyet"
    name="gender"
    placeholder="Cinsiyetinizi seçin"
    options={[
    { value: "male", label: "Erkek" },
    { value: "female", label: "Kadın" },
    { value: "other", label: "Diğer" },
    ]}
    isMulti={true}
    isSearchable={true}
    helpText="Cinsiyetiniz"
    isRequired={true}
/>
```

5. **SelectBox**: Açılır kutu bileşeni.

   - `label`: Bileşenin etiketi.
   - `name`: Bileşenin adı.
   - `placeholder`: Girdi alanı için yer tutucu.
   - `options`: Seçenekler listesi.
   - `isRequired`: Girdinin zorunlu olup olmadığı.
   - `helpText`: Yardımcı metin.

```bash
<SelectBox
    label="Şehir"
    name="city"
    placeholder="Şehrinizi seçin"
    options={[
    { value: "ist", label: "İstanbul" },
    { value: "skr", label: "Sakarya" },
    { value: "kce", label: "Kocaeli" },
    ]}
    isRequired={false}
    helpText="Şehir"
    defaultValue="ist"
/>
```

6. **FileUpload**: Dosya yükleme bileşeni.

   - `label`: Bileşenin etiketi.
   - `name`: Bileşenin adı.
   - `acceptedFileTypes`: Kabul edilen dosya türleri.
   - `maxFileSize`: Maksimum dosya boyutu.
   - `isRequired`: Girdinin zorunlu olup olmadığı.
   - `valueType`: Dosya verisinin türü.
   - `helpText`: Yardımcı metin.

```bash
<FileUpload
    label="Dosya Yükle"
    name="file"
    acceptedFileTypes={FileTypes.IMAGE}
    maxFileSize={2}
    isRequired={true}
    valueType="base64"
    helpText="Yüklemek istediğiniz dosyayı seçin."
/>
```

7. **DateTimePicker**: Tarih ve saat seçimi için kullanılır.

   - `label`: Bileşenin etiketi.
   - `name`: Bileşenin adı.
   - `placeholder`: Girdi alanı için yer tutucu.
   - `isRequired`: Girdinin zorunlu olup olmadığı.
   - `helpText`: Yardımcı metin.
   - `leftAddon`: Sol taraf ek bileşeni.
   - `setTodayAsDefault`: Bugünü varsayılan olarak ayarlama.
   - `includeTime`: Saat dahil etme.

```bash
<DateTimePicker
    label="Doğum Tarihi"
    name="birthDate"
    placeholder="Doğum tarihinizi seçin"
    isRequired={true}
    helpText="Doğum tarihiniz"
    leftAddon={"#"}
    setTodayAsDefault={true}
    includeTime={false}
/>
```

8. **RadioGroup**: Radyo düğmeleri grubu.

   - `label`: Bileşenin etiketi.
   - `name`: Bileşenin adı.
   - `options`: Seçenekler listesi.
   - `isRequired`: Girdinin zorunlu olup olmadığı.
   - `helpText`: Yardımcı metin.
   - `defaultValue`: Varsayılan değer.

```bash
<RadioGroup
    label="Evli mi?"
    name="isMarried"
    options={[
    { value: "yes", label: "Evet" },
    { value: "no", label: "Hayır" },
    ]}
    isRequired={true}
    helpText="Evli misiniz?"
    defaultValue="no"
/>
```

9. **SwitchGroup**: Anahtar bileşeni.

   - `label`: Bileşenin etiketi.
   - `name`: Bileşenin adı.
   - `helpText`: Yardımcı metin.
   - `defaultValue`: Varsayılan değer.

```bash
<SwitchGroup
    label="Aktif mi?"
    name="isActive"
    helpText="Aktif misiniz?"
    defaultValue={true}
/>
```

10. **CheckboxGroup**: Onay kutuları grubu.
    - `label`: Bileşenin etiketi.
    - `name`: Bileşenin adı.
    - `options`: Seçenekler listesi.
    - `isRequired`: Girdinin zorunlu olup olmadığı.
    - `helpText`: Yardımcı metin.
    - `defaultValue`: Varsayılan değer.

```bash
<CheckboxGroup
    label="Hobiler"
    name="hobbies"
    options={[
    { value: "football", label: "Futbol" },
    { value: "basketball", label: "Basketbol" },
    { value: "swimming", label: "Yüzme" },
    ]}
    isRequired={true}
    helpText="Hobileriniz"
    defaultValue={["football"]}
/>
```

### DataTable Bileşeni

`DataTable` bileşeni, veri tablolarını yönetmek ve kullanıcıya çekici bir arayüz sunmak için kullanılır. Sütun bilgilerine göre veri ekleme ve düzenleme işlemleri otomatik olarak yapılabilir. `DataTableForm` bileşeni kullanılarak drawer veya modalda veri ekleme işlemi gerçekleştirilir.

#### Props

- **columns (array)**: Tablonun sütunlarını tanımlar. Her sütun için `key`, `header`, `type`, `order` gibi özellikler belirtilir.
- **columns (defaultAdd)**: Tablonun sütunlarınından yola çıkarak otomatik form oluşturmak için form bileşenlerini propslarınıda belirtebilirsiniz.
- **data (array)**: Tablo verileri.
- **contextMenuItems (array)**: Satırlara sağ tıklama menüsü eklemek için öğeler.
- **toolbarButtons (array)**: Tablo üzerinde çeşitli araç çubuğu düğmeleri eklemek için öğeler.
- **onDataChange (func)**: Veri değişikliklerinde çağrılacak fonksiyon.
- **onItemClick (func)**: Context menü öğesine tıklandığında çağrılacak fonksiyon.
- **onToolbarButtonClick (func)**: Araç çubuğu düğmesine tıklandığında çağrılacak fonksiyon.
- **onSave (func)**: Veri kaydedildiğinde çağrılacak fonksiyon.
- **showOn (string)**: Veri ekleme/düzenleme formunun nasıl gösterileceği. Değerler: `"drawer"`, `"modal"`.

#### Örnek veri ve sütunlar

```bash
const columns = [
  { key: "id", header: "ID", primaryKey: true, visible: false, type: "Number" },
  {
    key: "avatar",
    header: "Avatar",
    render: () => (
      <img
        src={avatar}
        alt="user"
        style={{ maxWidth: "100px", height: "auto" }}
      />
    ),
    width: "80px",
    type: "File",
    acceptedFileTypes: "image/*",
    valueType: "base64",
    order: 0,
  },
  {
    key: "name",
    header: "Ad",
    type: "String",
    isRequired: true,
    maxLength: 50,
    order: 1,
  },
  {
    key: "age",
    header: "Yaş",
    type: "Number",
    isRequired: true,
    min: 0,
    max: 120,
    order: 2,
  },
  { key: "email", header: "Email", type: "String", isRequired: true, order: 3 },
];
```

#### ContexMenu itemleri

```bash
const contextMenuItems = [
  { key: "Edit", text: "Düzenle", icon: MdEdit },
  { key: "Delete", text: "Sil", icon: MdDeleteForever },
];
```

#### Toolbar butonları

```bash
const toolbarButtons = [
  { key: "Export", header: "Export", icon: MdFileDownload },
  { key: "Import", header: "Import", icon: MdFileUpload },
];
```

#### DataTable Kullanım örneği

```bash

// Search ve Pagination gibi istekleri yönetebileceğimiz event
const fetchData = ({ currentPage, rowsPerPageState, searchTerm }) => {
    console.log("Fetching data with params:", {
        currentPage,
        rowsPerPageState,
        searchTerm,
    });

    setTableData(data);
    setTotalCount(data.length);
};

// ContexMenu Tıklama eventi
const handleItemClick = (key, rowData) => {
    if (key === "Edit") {
        console.log(key, rowData);
    } else if (key === "Delete") {
        console.log(key, rowData);
    }
};

// ToolbarButton tıklama eventi
const handleToolbarButtonClick = (key, selectedRowsData) => {
    console.log("Tıklanan Buton:", key);
    console.log("Seçili Satırlar:", selectedRowsData);
};

// yeni eklenen veya düzenlenen veriler
    const handleSaveData = (formData) => {
    console.log("Form Verileri:", formData);
};

<DataTable
    columns={columns}
    data={tableData}
    totalCount={totalCount}
    rowsPerPage={5}
    onDataChange={fetchData}
    handleRefresh={() => {
    return data;
    }}
    deleteActive={true}
    onDelete={(e) => {
    console.log(e);
    }}
    editActive={true}
    selectable={true}
    onDeleteSelected={(e) => {
    console.log(e);
    }}
    contextMenuItems={contextMenuItems}
    onItemClick={handleItemClick}
    toolbarButtons={toolbarButtons}
    onToolbarButtonClick={(key) =>
    handleToolbarButtonClick(
        key,
        tableData.filter((row) => row.selected)
    )
    }
    defaultAddButton={true}
    onSave={handleSaveData}
    showOn={"drawer"}
/>
```

Daha fazla bilgi ve bileşenlerin detayları için proje dosyalarını inceleyebilirsiniz.
