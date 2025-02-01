import { VECTOR_COMP_VALS, VECTOR_COMPS, VectorEmbedding } from "./VectorEmbedding";

import data from "./candidates.json";

const candidates = data.map(candidateData => {
    const arr: [number, number][] = [];

    for (const key in candidateData) {
        const val = candidateData[key];

        let ix = 0;

        switch (key) {
            case 'js':
                ix = VECTOR_COMPS.JS;
                break;
            case 'reactjs':
                ix = VECTOR_COMPS.REACTJS;
                break;
            case 'nodejs':
                ix = VECTOR_COMPS.NODEJS;
                break;
            case 'java':
                ix = VECTOR_COMPS.JAVA;
                break;
            case 'springboot':
                ix = VECTOR_COMPS.SPRINGBOOT;
                break;
            case 'c#':
                ix = VECTOR_COMPS.CSHARP;
                break;
            case 'mysql':
                ix = VECTOR_COMPS.MYSQL;
                break;
        }

        let componentVal = 0;

        if (val <= 2 && val > 0) {
            componentVal = VECTOR_COMP_VALS.BEGINNER;
        } else if (val > 2 && val <= 4) {
            componentVal = VECTOR_COMP_VALS.INTERMEDIATE;
        } else if (val > 4) {
            componentVal = VECTOR_COMP_VALS.EXPERT;
        }

        arr.push([ix, componentVal]);
    }

    return createEmbedding(arr);
});

export function createEmbedding(arr?: [number, number][]) {
    return new VectorEmbedding([
        // VECTOR_COMPS.JS,
        VECTOR_COMP_VALS.NOTHING,

        // VECTOR_COMPS.EXPRESSJS,
        VECTOR_COMP_VALS.NOTHING,
        // VECTOR_COMPS.NODEJS,
        VECTOR_COMP_VALS.NOTHING,
        // VECTOR_COMPS.NESTJS,
        VECTOR_COMP_VALS.NOTHING,
        // VECTOR_COMPS.NEXTJS,
        VECTOR_COMP_VALS.NOTHING,
        // VECTOR_COMPS.REACTJS,
        VECTOR_COMP_VALS.NOTHING,
        // VECTOR_COMPS.VUEJS,
        VECTOR_COMP_VALS.NOTHING,
        // VECTOR_COMPS.ANGULAR,
        VECTOR_COMP_VALS.NOTHING,

        // VECTOR_COMPS.JAVA,
        VECTOR_COMP_VALS.NOTHING,

        // VECTOR_COMPS.SPRINGBOOT,
        VECTOR_COMP_VALS.NOTHING,

        // VECTOR_COMPS.CSHARP,
        VECTOR_COMP_VALS.NOTHING,

        // VECTOR_COMPS.POSTGRESQL,
        VECTOR_COMP_VALS.NOTHING,
        // VECTOR_COMPS.SQLITE,
        VECTOR_COMP_VALS.NOTHING,
        // VECTOR_COMPS.MYSQL,
        VECTOR_COMP_VALS.NOTHING,
        // VECTOR_COMPS.MONGODB,
        VECTOR_COMP_VALS.NOTHING,
    ], arr);
}

export function getResults(vector: VectorEmbedding, vectorList: VectorEmbedding[]) {
    return vectorList
        .map(vec => vec.dot(vector))
        .map((val, ix) => ({
            val,
            ix,
        }))
        .sort((a, b) => b.val - a.val);
}

console.log('candidates:', candidates);

const job = createEmbedding([
    [VECTOR_COMPS.JS, VECTOR_COMP_VALS.BEGINNER],
]);

console.log('test:', getResults(job, candidates));