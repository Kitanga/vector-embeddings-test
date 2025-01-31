import { VECTOR_COMP_VALS, VECTOR_COMPS, VectorEmbedding } from "./VectorEmbedding";

const candidates = [
    new VectorEmbedding(),
    new VectorEmbedding(),
];

candidates[0].setComp(VECTOR_COMPS.JS, VECTOR_COMP_VALS.EXPERT);
candidates[1].setComp(VECTOR_COMPS.EXPRESSJS, VECTOR_COMP_VALS.EXPERT);

console.log('candidates:', candidates);