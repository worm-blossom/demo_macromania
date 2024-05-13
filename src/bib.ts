import { BibItemDeclaration } from "../deps.ts";

export const bib: BibItemDeclaration[] = [
  {
    // Item must be a BibTex string or a CSL json item https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html#items
    item: `@inproceedings{meyer2023range,
title={Range-Based Set Reconciliation},
author={Meyer, Aljoscha},
booktitle={2023 42nd International Symposium on Reliable Distributed Systems (SRDS)},
pages={59--69},
year={2023},
organization={IEEE}
}
`,
    asset: ["references", "meyer2023range.pdf"], // Citations and the bibliography will link to the asset.
  },
  {
    item: `@article{farmer2011network,
title={Network-based functional regions},
author={Farmer, Carson JQ and Fotheringham, A Stewart},
journal={Environment and Planning A},
volume={43},
number={11},
pages={2723--2741},
year={2011},
publisher={SAGE Publications Sage UK: London, England}
}
`,
    href: "https://journals.sagepub.com/doi/abs/10.1068/a44136", // Citations and the bibliography will link to the this URL.
  },
  {
    item: `@inproceedings{toomim2011utility,
title={Utility of human-computer interactions: Toward a science of preference measurement},
author={Toomim, Michael and Kriplean, Travis and Pörtner, Claus and Landay, James},
booktitle={Proceedings of the SIGCHI Conference on Human Factors in Computing Systems},
pages={2275--2284},
year={2011}
}
`,
  },
];
