export const TEMPERATURE = 8;

export class VectorEmbedding {
    components: VECTOR_COMP_VALS[] = [];

    constructor(embeddings: VECTOR_COMP_VALS[], attributes?: [VECTOR_COMPS, VECTOR_COMP_VALS][]) {
        this.init(embeddings, attributes);
    }

    /**
     * Create a components list and add any passed component data if needed
     * @param attributes A list of components that will be set to the main components list
     */
    init(embeddings: VECTOR_COMP_VALS[], attributes?: [VECTOR_COMPS, VECTOR_COMP_VALS][] | undefined) {
        const comp = this.components = embeddings;

        attributes?.forEach(valPair => {
            const [ix, val] = valPair;

            this.setComp(ix, val);
        });
    }

    /**
     * Set the the value of a component and subsequently any related vector components that aren't set but related
     * 
     * @param ix The component index
     * @param val The component value
     * @returns The vector embedding in case you want to method chain
     */
    setComp(ix: VECTOR_COMPS, val: VECTOR_COMP_VALS) {
        this.components[ix] = val;

        // TODO: later on make the relations based on experience as well, e.g. ExpressJS expert can also be an intermediate Nodejs developer

        // Update relations
        const relations = VECTOR_COMP_VALS_RELATIONS[ix];

        if (relations) {
            for (const prop in relations) {
                this.components[prop] = Math.max(relations[prop], this.components[prop]);
            }
        }

        // To allow chaining
        return this;
    }

    /**
     * Resets all components to zero
     */
    reset() {
        this.init([]);
    }

    /**
     * 
     * @returns Returns an array whose length is 1
     */
    normalize() {

        const magnitude = Math.hypot(...this.components);

        const normalizedArr = this.components.map(val => val / magnitude);

        return normalizedArr;
    }

    dot(otherVector: VectorEmbedding) {
        const comps = this.components.concat([]);

        const otherComponents = otherVector.components.concat([]);

        // TODO: you might want to use softmax here
        // Check if anything has been set and make it bigger then renormalize
        comps.map((val, ix) => {
            const otherComponentsVal = otherComponents[ix];

            if (otherComponentsVal > 0) {
                comps[ix] *= TEMPERATURE;
            }
        });

        if (comps.length != otherComponents.length) {
            throw new Error('Embeddings have different dimensions');
        }

        return comps.map((val, ix) => {
            return val * otherComponents[ix];
        }).reduce((a, b) => a + b, 0) / (Math.hypot(...comps) * Math.hypot(...otherComponents));
    }
}

export enum VECTOR_COMPS {
    // JavaScript
    JS,

    EXPRESSJS,
    NODEJS,
    NESTJS,
    NEXTJS,
    REACTJS,
    VUEJS,
    ANGULAR,

    // Java
    JAVA,

    SPRINGBOOT,

    // C#
    CSHARP,

    // c

    // DBs
    POSTGRESQL,
    SQLITE,
    MYSQL,
    MONGODB,
}

export enum VECTOR_COMP_VALS {
    /** Used when a user doesn't know a topic */
    NOTHING,
    /** Used when a user might know a topic */
    MIGHT_KNOW,
    /** Used when a user is a beginner to a topic */
    BEGINNER,
    /** Used when a user is practically competent in topic */
    INTERMEDIATE,
    /** Used when a user is an expert in a topic */
    EXPERT
}

// Relations between components
export const NODEJS_LIB_RELATIONS_0 = {
    [VECTOR_COMPS.JS]: 0.3,
    [VECTOR_COMPS.NODEJS]: 0.1,
};
export const JS_ENVIRONMENT_RELATIONS_0 = {
    [VECTOR_COMPS.JS]: 0.3,
};
export const JS_LIB_RELATIONS_0 = {
    [VECTOR_COMPS.JS]: 0.3,
};
export const JAVA_FRAMEWORK_RELATIONS_0 = {
    [VECTOR_COMPS.JAVA]: 0.3,
};

export const VECTOR_COMP_VALS_RELATIONS = {
    [VECTOR_COMPS.EXPRESSJS]: NODEJS_LIB_RELATIONS_0,
    [VECTOR_COMPS.NODEJS]: JS_ENVIRONMENT_RELATIONS_0,
    [VECTOR_COMPS.NESTJS]: NODEJS_LIB_RELATIONS_0,
    [VECTOR_COMPS.NEXTJS]: NODEJS_LIB_RELATIONS_0,
    [VECTOR_COMPS.REACTJS]: JS_LIB_RELATIONS_0,
    [VECTOR_COMPS.VUEJS]: JS_LIB_RELATIONS_0,
    [VECTOR_COMPS.ANGULAR]: JS_LIB_RELATIONS_0,
    [VECTOR_COMPS.SPRINGBOOT]: JAVA_FRAMEWORK_RELATIONS_0,
}
