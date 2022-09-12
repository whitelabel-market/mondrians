<script lang="ts">
import { defineComponent, provide } from "vue";
import CONFIG from "../../../../../config";
import { getContract } from "@/services/graphql/types";
import { CONTRACT_CONTEXT, createContract } from "@/composables/useContract";
import { createToggles, TOGGLE_CONTEXT } from "@/composables/useFlags";
import { createCurrency, CURRENCY_CONTEXT } from "@/composables/useCurrency";
import { useMamoSubgraph } from "@/composables/useSubgraph";

export default defineComponent({
  inheritAttrs: false,
  setup(props, { slots }) {
    // TODO: Execute contract fetch on new block
    // const { onNewBlock }= useBlock
    // onNewBlock(() => {
    //   execute();
    // });

    const { onFetchResponse, data } = useMamoSubgraph(getContract, {
      id: CONFIG.contract.toLocaleLowerCase(),
    });

    onFetchResponse(() => {
      // TODO: App wide pageloader
      // setPageLoading(false)
    });

    provide(CONTRACT_CONTEXT, createContract(data));
    provide(TOGGLE_CONTEXT, createToggles());
    provide(CURRENCY_CONTEXT, createCurrency());

    return () => slots.default?.();
  },
});
</script>
