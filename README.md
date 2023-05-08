
# Events App
Uygulamayı çalıştırmak için:


## Kurulum

Projeyi klonlayın

```bash
  git clone https://github.com/tahayeslbg/events-backend.git
```

Proje dizinine gidin

```bash
  cd /events-backend
```

Gerekli paketleri yükleyin

```bash
  npm install
```

Development modunda çalıştırmak için:

```bash
  npm run dev
```

Production modunda çalıştırmak için:

```bash
  npm run build
  npm run start
```

  
## API Kullanımı

### Etkinlikler

#### Tüm Etkinlikleri Getir

```http
  GET /events
```

#### Etkinlik Getir

```http
  GET /events/${eventId}
```

| Parameter | Type     | Explanation                       |
| :-------- | :------- | :-------------------------------- |
| `eventId`      | `string` | **Gerekli**. Çağrılacak etkinliğin anahtar değeri |

#### Etkinlik Queryleri

```http
  GET /events?place={place}
```

```http
  GET /events?search={search}
```

```http
  GET /events?date={date}
```

| Parameter | Type     | Explanation                       |
| :-------- | :------- | :-------------------------------- |
| `place`      | `string` | **Opsiyonel**. Filtrelenecek etkinliklerin place değeri |
| `search`      | `string` | **Opsiyonel**. Aranılacak etkinliklerin search değeri  |
| `date`      | `string` | **Opsiyonel**. Filtrelenecek etkinliklerin date değeri |

#### Etkinlik Ekle

```http
  POST /events/
```

| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcın Token'ı |

| Body | Type     |
| :-------- | :------- |
| `title`      | `string` | 
| `description`      | `string` | 
| `image`      | `string` |
| `place`      | `string` |
| `date`      | `string` |
| `category`      | `ObjectId` |

#### Etkinliği Güncelle

```http
  PUT /events/${eventId}
```
| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcın Token'ı |

| Body | Type     |
| :-------- | :------- |
| `title`      | `string` | 
| `description`      | `string` | 
| `image`      | `string` |
| `place`      | `string` |
| `date`      | `string` |
| `category`      | `ObjectId` |

#### Etkinliği Sil

```http
  DELETE /events/${eventId}
```
| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcın Token'ı |

| Parameter | Type     | Explanation                       |
| :-------- | :------- | :-------------------------------- |
| `eventId`      | `string` | **Gerekli**. Silinecek etkinliğin anahtar değeri |

### Kullanıcı

#### Kullanıcı Kayıt Ol
```http
  POST /users/register
```

| Body | Type     |
| :-------- | :------- |
| `name`      | `string` | 
| `surname`      | `string` | 
| `password`      | `string` |
| `emailAddress`      | `string` |


#### Kullanıcı Giriş Yap
```http
  POST /users/login
```

| Body | Type     |                       
| :-------- | :------- |                                    
| `emailAddress`      | `string` |                
| `password`      | `string` | 

#### Giriş Yapan veya Kayıt Olan Kullanıcıyı Getir
```http
  GET /users/me
```
| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcının Token'ı |


#### Biletleri Getir
```http
  GET /users/me/tickets
```
| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcının Token'ı |

#### Bilet Ekle
```http
  POST /users/me/tickets/${eventId}
```

| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcının Token'ı |

| Parameter | Type     | Explanation                       |
| :-------- | :------- | :-------------------------------- |
| `eventId`      | `string` | **Gerekli**. Eklenecek biletin anahtar değeri  |

#### Bileti Sil
```http
  DELETE /users/me/tickets/${eventId}
```

| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcının Token'ı |

| Parameter | Type     | Explanation                       |
| :-------- | :------- | :-------------------------------- |
| `eventId`      | `string` | **Gerekli**. Silinecek biletin anahtar değeri  |




#### Takvime Eklenen Etkinlikleri Getir
```http
  GET /users/me/calendar
```
| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcının Token'ı |

#### Takvime Etkinlik Ekle
```http
  POST /users/me/calendar/${eventId}
```

| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcının Token'ı |

| Parameter | Type     | Explanation                       |
| :-------- | :------- | :-------------------------------- |
| `eventId`      | `string` | **Gerekli**. Eklenecek biletin anahtar değeri  |

#### Takvimdeki Etkinliği Sil
```http
  DELETE /users/me/calendar/${eventId}
```

| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcının Token'ı |

| Parameter | Type     | Explanation                       |
| :-------- | :------- | :-------------------------------- |
| `eventId`      | `string` | **Gerekli**. Silinecek biletin anahtar değeri  |

### Kategoriler

#### Tüm Kategorileri Getir

```http
  GET /categories
```

#### Kategori Getir

```http
  GET /categories/${categoryId}
```

| Parameter | Type     | Explanation                       |
| :-------- | :------- | :-------------------------------- |
| `categoryId`      | `string` | **Gerekli**. Çağrılacak kategorinin anahtar değeri |

#### Kategorinin İçindeki Etkinlik Queryleri

```http
  GET /categories?place={place}
```

```http
  GET /categories?search={search}
```

```http
  GET /categories?date={date}
```

| Parameter | Type     | Explanation                       |
| :-------- | :------- | :-------------------------------- |
| `place`      | `string` | **Opsiyonel**. Filtrelenecek kategori etkinliklerinin place değeri |
| `search`      | `string` | **Opsiyonel**. Aranılacak kategori etkinliklerinin search değeri  |
| `date`      | `string` | **Opsiyonel**. Filtrelenecek kategori etkinliklerinin date değeri |

#### Kategori Ekle

```http
  POST /categories/
```

| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcının Token'ı |

| Body | Type     |
| :-------- | :------- |
| `name`      | `string` | 

#### Kategoriyi Güncelle

```http
  PUT /categories/${categoryId}
```
| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcın Token'ı |

| Body | Type     |
| :-------- | :------- |
| `name`      | `string` | 

#### Kategoriyi Sil

```http
  DELETE /categories/${categoryId}
```
| Header | Type     | Explanation |
| :-------- | :------- |:---------------------|
| `Bearer Token`      | `string` | **Gerekli**. Authentication işlemi gerçekleşen kullanıcın Token'ı |

| Parameter | Type     | Explanation                       |
| :-------- | :------- | :-------------------------------- |
| `categoryId`      | `string` | **Gerekli**. Silinecek kategorinin anahtar değeri |


  
## Kullanılan Teknolojiler

**Node.js, Express, Typescript, MongoDB** 



  
## Demo

https://stingray-app-49bnu.ondigitalocean.app/

  