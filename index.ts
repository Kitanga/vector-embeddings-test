// TODO: Please note that this is for testing not a final code state

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
    const scores: { ix: number; score: number, experienceScore: number }[] = new Array(vectorList.length);

    const targetCompIXs: VECTOR_COMPS[] = [];

    vector.components.forEach((val, ix) => {
        if (val > 0) {
            targetCompIXs.push(ix);
        }
    });

    for (let ix = 0, length = vectorList.length; ix < length; ix++) {
        const vec = vectorList[ix];

        const dot = vec.dot(vector);

        const experienceScore = calcExperienceScore(vec, targetCompIXs);

        console.log('experience:', experienceScore)

        let score = dot + experienceScore;

        scores[ix] = {
            ix: ix,
            score,
            experienceScore
        };
    }

    return scores.sort((a, b) => b.score - a.score);
}

function calcExperienceScore(vector: VectorEmbedding, targetCompIXs: VECTOR_COMPS[]) {
    return vector.components.reduce((a, b, ix) => {
        if (targetCompIXs.includes(ix)) {
            switch (b) {
                case VECTOR_COMP_VALS.NOTHING:
                    return a + 0;
                case VECTOR_COMP_VALS.MIGHT_KNOW:
                    return a + 0.14;
                case VECTOR_COMP_VALS.BEGINNER:
                    return a + 0.52;
                case VECTOR_COMP_VALS.INTERMEDIATE:
                    return a + 0.86;
                case VECTOR_COMP_VALS.EXPERT:
                    return a + 1;
                default:
                    return a + b;
            }
        } else {
            return a;
        }
    }, 0);
}

console.log('candidates:', candidates);

const job = createEmbedding([
    [VECTOR_COMPS.JS, VECTOR_COMP_VALS.BEGINNER],
]);

console.log('job:', job);

console.log('test:', getResults(job, candidates));