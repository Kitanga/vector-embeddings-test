export class VectorEmbedding {
    components: VECTOR_COMP_VALS[] = [];

    constructor() {
        this.init();
    }

    init() {
        this.components = [
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
        ]
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
                this.components[prop] = relations[prop];
            }
        }

        // To allow chaining
        return this;
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
