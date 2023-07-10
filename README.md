# ITNETWORK - ZÁVĚREČNÝ PROJEKT (INSURANCEAPP)

V tomto repozitáři naleznete **ZÁVEREČNÝ PROJEKT (Evidence pojištění - Zjednodušená verze)** k rekvalifikačnímu kurzu **Programátor www aplikací v JavaScript** od společnosti [ITNetwork.cz](https://www.itnetwork.cz/prace-a-podnikani-v-it/rekvalifikacni-kurzy).

<img src="assets/design/page-preview.png" width="800px">

## Obsah

- [Přehled](#přehled)
  - [Zadání projektu 📋](#zadani)
  - [Náhled 👀](#nahled)
  - [Odkaz LIVE ➡🌍⬅](#odkaz)
- [Můj proces](#muj-proces)
  - [Popis](#popis)
  - [Funkcionality](#funkcionality)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Přehled

### Zadani 
**Webová aplikace (JavaScript, PHP)**

Naprogramuj webovou aplikaci pro evidenci pojistných událostí.

  **Minimální požadavky ke splnění**
  - Aplikace obsahuje správu **pojištěných** (to jsou pojištěné osoby, např. "Jan Novák"):
    - Vytvoření pojištěného
      - Evidujte jméno, příjmení, věk a telefonní číslo
    - Zobrazení seznamu všech pojištěných
  - Dané entity jsou uloženy v kolekci v paměti (JS) nebo v databázi (PHP)
  - Aplikaci lze pro zjednodušení vytvořit celou jen na jedné stránce
  - Aplikace je naprogramována podle dobrých praktik

  **Dobré praktiky**
  - Oddělujte kód do samostatných tříd a souborů
  
**JavaScript**
  - Využívejte konstruktory pro inicializaci objektů
  - `toString()` pro jejich výpis

### Nahled
#### Desktopový náhled - Světlý motiv 🖥
<img src="assets/design/page-preview.png" width="800px">

#### Desktopový náhled - Tmavý motiv 🖥
<img src="assets/design/page-preview-dark.png" width="800px">

#### Mobilní náhled 📱
<table>
  <tr>
    <td>Světlý motiv</td>
    <td>Tmavý motiv</td>
  </tr>
  <tr>
    <td><img src="assets/design/mobile-preview-light.png" width="350px"></td>
    <td><img src="assets/design/mobile-preview-dark.png" width="350px"></td>
  </tr>
</table>



### Odkaz

➡ [Projekt ŽIVĚ k vyzkoušení](https://pettik-itnetwork.netlify.com/) ⬅

## Muj proces
 

### Popis

- Projekt spočívá v tom, že zobrazuje a přidává jednotlivé záznamy vyplněné ve **formuláři** na horní části stránky do **tabulky** ve spodní části stránky.
- Celý projekt se skládá z hlavního souboru `index.html` a složky `assets`, ve které jsou uloženy všechny dodatečné soubory (CSS styly, obrázky pro projekt, screeny projektu, JavaScript soubory).
- JavaScript využívá metodu **Objektově orientovaného programování** a je poskládán ze 3 souborů (`Client.js`, `InsuranceApp.js`, `index.js`).
- Při vyplnění jednotlivých políček formuláře a kliknutí na tlačítko `Uložit` se vyplněné záznamy (jsou-li správně) vypíší do jednotlivch řádků tabulky.
- Je-li formulář správně vyplněný, ukládají se tyto data pole s názvem `clients` a do paměti prohlížeče `localStorage`. Při načtění stránky se kontroluje pamět localStorage a jsou-li zde nějaká data, zobrazí se v tabulce.
- Z velké části tento projekt vychází ze základů logiky cvičení v [OOP - Lekce 5 - Tvorba OOP diáře v JavaScriptu](https://www.itnetwork.cz/javascript/oop/tvorba-oop-diare-v-javascriptu).
- Design stránky byl záměrně inspirován designem stránky [ITnetwork.cz](https://www.itnetwork.cz/), pozadí zase aplikací **Whatsapp**.


### Funkcionality 

#### 1) Přepínání na tmavý/svělý design
Kliknutím na tlačítko **měsíce** v horní liště nadpisu (v pravném rohu stránky), se v JavaScriptu přidá k určitým elementům na stráce `CSS třída`, která má jiné vizuální vlastnosti a tím se docílí se prolnutí do **tmavého režimu**. Opětovným kliknutím na již změněnou ikonku **měsíce/slunce**, se třída odstraní a docílí se původního (svělého) motivu. Přechod je plynulý a nastavuje se paramterem `--theme-time` v CSS stylech (aktuálně trvá 0.85s).<br>
<img src="assets/design/moon-sun-icon.png">

#### 2) Formulář - ošetření vstupů uživatele
Jednotlivé textové vstupy od uživatele jsou při kliknutí na tlačítko **Uložit** kontrolovány náslědovně:

- Pole **Jméno** musí obsahovat alespoň **2 znaky**
- Pole **Příjmení** musí obsahovat alespoň **2 znaky**
- Pole **Věk** musí být **číslice** v rozmezí **0** až **169** *(na Zemi nebylo dokázáno delší lidské dožití :) )* 
- Pole **Telefon** musí být zadán ve formátu `ABC DEF GHI`, `ABCDEFGHI`, `+420 ABC DEF GHI`, `+420ABCDEFGHI` - v každém případě se do tabulky zapisuje pouze formát `ABC DEF GHI` (smaže se případná předvolba)

Pokud některé pole při kliknutí na tlačítko formuláře nesplňuje požadavek, zabarví se rámeček `červeně` a zobrazí se daná hláška, upozorňující uživatele na chybu.<br>
<img src="assets/design/form-inputs-check.png">


Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```js
const proudOfThisFunc = () => {
  console.log('🎉')
}
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
