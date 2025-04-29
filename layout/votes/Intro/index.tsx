import type { FC } from 'react'

import BlockContent from 'components/BlockContent'
import Button from 'components/Button'
import Head from 'components/Head'
import Page from 'layout/Page'
import { useLocale, useTranslations } from 'next-intl'
import { CenterWrap } from 'styles/CenterWrap'

const czContent =
  "<p><strong>Hlasuj pro nejlepší burger na festivalu! I díky tobě třeba bude tvůj burgermaker mít medaili.</strong></p><p><strong>Jak na to?</strong></p><p>1. Vyplň svoje osobní údaje.</br>2. Zadej kód z hlasovacího lístku, který jsi dostal při nákupu burgeru.</br>3. Hlasuj pro tvého favorita.</br>4. Potvrď souhlas s podmínkami soutěže a zpracováním osobních údajů.</br>5. Klikni na ODESLAT</br>6. Potvrď svůj hlas přes email</p><p><strong>A to je vše!</strong></p><p>Křestní jméno výherce a výherní kód zveřejníme na webu <a href='http://burgerstreetfestival.cz' title='smartCard-inline'>http://burgerstreetfestival.cz</a>  a na události festivalu na Facebooku nejpozději v pondělí po festivalu. Pokud jsi vyhrál, dáme ti vědět také mailem.</p><p><strong>O co hrajeme?</strong></p><p>1. cena - voucher 2000 Kč na burgery pro festivaly v sezoně 2025 a 2026</br>2. cena - voucher 1000 Kč na burgery pro festivaly v sezoně 2025 a 2026</br>3. cena - voucher  500 Kč na burgery pro festivaly v sezoně 2025 a 2026</p>"
const plContent =
  "<p><strong>Zagłosuj na najlepszego burgera festiwalu! Dzięki Tobie twój ulubiony burger może zdobyć medal.</strong></p> <p><strong>Jak głosować?</strong></p> <p>1. Wypełnij swoje dane osobowe.</br> 2. Wpisz kod z karty do głosowania, którą otrzymałeś przy zakupie burgera.</br> 3. Zagłosuj na swojego faworyta.</br> 4. Potwierdź zgodę na warunki konkursu oraz przetwarzanie danych osobowych.</br> 5. Kliknij WYŚLIJ.</br> 6. Potwierdź swój głos poprzez e-mail.</p> <p><strong>I to wszystko!</strong></p> <p>Imię zwycięzcy oraz zwycięski kod opublikujemy na stronie <a href='http://burgerfestival.pl' title='smartCard-inline'>http://burgerfestival.pl</a> oraz w wydarzeniu festiwalowym na Facebooku najpóźniej w poniedziałek po festiwalu. Jeśli wygrasz, poinformujemy Cię również mailowo.</p> <p><strong>Co możesz wygrać?</strong></p> <p>1. miejsce – voucher o wartości 350 zł na burgery podczas festiwali w sezonie 2025 i 2026</br> 2. miejsce – voucher o wartości 200 zł na burgery podczas festiwali w sezonie 2025 i 2026</br> 3. miejsce – voucher o wartości 100 zł na burgery podczas festiwali w sezonie 2025 i 2026</p>"

const Intro: FC<{ link: string; festivals: any }> = ({ link, festivals }) => {
  const t = useTranslations('global')
  const locale = useLocale()
  return (
    <Page>
      <div style={{ margin: '40px 0 100px' }}>
        <Head text={festivals.title} type={'h1'} />
        <BlockContent
          head={festivals.place}
          margin
          content={locale === 'en' ? czContent : plContent}
        />
        <CenterWrap marginBottom={80}>
          <Button href={`/${link}/${festivals.slug}`}>{t('startVotes')}</Button>
        </CenterWrap>
      </div>
    </Page>
  )
}

export default Intro
