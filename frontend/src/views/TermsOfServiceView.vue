<template>
  <div>
    <LayoutViewHeader variant="dodgerblue">
      <h1 class="text-4xl font-bold leading-relaxed text-center">
        Terms of service
      </h1>
    </LayoutViewHeader>

    <section
      class="transition-colors duration-200 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"
    >
      <div class="container max-w-4xl px-8 mx-auto space-y-8">
        <div class="space-y-2">
          <h2 class="text-2xl font-bold uppercase">ANGABEN GEMÄSS § 5 TM</h2>
          <ul>
            <li>NXT YOU GmbH</li>
            <li>Tölzer Straße 1</li>
            <li>82031 Grünwald</li>
          </ul>
          <ul>
            <li>Handelsregister: HRB 265113</li>
            <li>Registergericht: Amtsgericht München</li>
            <li>Geschäftsführer: Clemens Kauschke</li>
          </ul>
        </div>
        <div class="space-y-2">
          <h2 class="text-xl font-bold">Kontakt</h2>
          <ul>
            <li>Telefon: +49 176 5684 2497</li>
            <li>E-Mail: info@nxtyou.de</li>
          </ul>
        </div>

        <div class="space-y-2">
          <h2 class="text-xl font-bold">Umsatzsteuer-ID</h2>
          <ul>
            <li>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a
              Umsatzsteuergesetz: DE343946447
            </li>
          </ul>
        </div>

        <div class="space-y-2">
          <h2 class="text-xl font-bold">Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              ref="noopener noreferrer"
              >https://ec.europa.eu/consumers/odr</a
            >. Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind
            nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
            einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          <h3 class="text-sm font-bold">Haftung für Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
            oder Sperrung der Nutzung von Informationen nach den allgemeinen
            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
            jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
            Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h3 class="text-sm font-bold">Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
            Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
            nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Links umgehend entfernen.
          </p>

          <h3 class="text-sm font-bold">Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
            Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
            Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
            entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Inhalte umgehend entfernen.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import LayoutViewHeader from "@/components/layouts/LayoutViewHeader.vue";
import { onMounted } from "vue";
import { useHead } from "@vueuse/head";
const emit = defineEmits(["loaded"]);

useHead({
  title: "Terms of Service",
});

onMounted(() => {
  emit("loaded", true);
});
</script>
