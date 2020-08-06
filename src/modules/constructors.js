import rgbaManipulationShader from '../shaders/processing/rgbaManipulation.shader';
import rgbFilteringShader from '../shaders/processing/rgbFiltering.shader';
import rgbPercentageFilteringShader from '../shaders/processing/rgbPercentageFiltering.shader';
import averageLayersShader from '../shaders/processing/averageLayers.shader';
import apply3x3KernelShader from '../shaders/processing/apply3x3Kernel.shader';

// takes in a pseudolayer and a vec4 (float 0-1)
export const rgbaManipulation = (webgl, rgbam_image, rgbam_multiplier) => {
    const pseudolayer = webgl.processPseudoLayer({
        inputs: {
            rgbam_image: rgbam_image, 
        },
        shader: rgbaManipulationShader,
        variables: {
            rgbam_multiplier: rgbam_multiplier,
        },
        dynamics: {}
    })
    return pseudolayer;
}

// takes in a pseudolayer, a 3x3 matrix and a float 
export const apply3x3Kernel = (webgl, a3k_image, a3k_kernel, a3k_kernelWeight) => {
    const pseudolayer = webgl.processPseudoLayer({
        inputs: {
            a3k_image: a3k_image,
        },
        shader: apply3x3KernelShader,
        variables: {
            a3k_textureWidth: webgl.width,
            a3k_textureHeight: webgl.height,
            a3k_kernel: a3k_kernel,
            a3k_kernelWeight: a3k_kernelWeight,
        },
        dynamics: {}
    })
    return pseudolayer;
}

// takes in 2 pseudolayers
export const averageLayers = (webgl, al1_image, al2_image) => {
    const pseudolayer = webgl.processPseudoLayer({
        inputs: {
            al1_image: al1_image,
            al2_image: al2_image,
        },
        shader: averageLayersShader,
        variables: {},
        dynamics: {},
    })
    return pseudolayer;
}

// takes in a pseudolayer, a float (0-1), a vec4 (float 0-1), string ("r", "g", "b") and a string ("<", ">")
export const rgbFiltering = (webgl, rgbf_image, rgbf_filter, rgbf_removed, rgbfd1_colour, rgbfd2_keep) => {
    // todo handling for dynamics
    const pseudolayer = webgl.processPseudoLayer({
        inputs: {
            rgbfp_image: rgbf_image,
        },
        shader: rgbFilteringShader,
        variables: {
            rgbfp_filter: rgbf_filter,
            rgbfp_removed: rgbf_removed,
        },
        dynamics: {
            rgbfpd1_colour: rgbfd1_colour,
            rgbfpd2_keep: rgbfd2_keep,
        }
    })
    return pseudolayer;
}

// takes in a pseudolayer, a float (0-1), a vec4 (float 0-1), string ("r", "g", "b") and a string ("<", ">")
export const rgbPercentageFiltering = (webgl, rgbfp_image, rgbfp_filter, rgbfp_removed, rgbfpd1_colour, rgbfpd2_keep) => {
    // todo handling for dynamics
    const pseudolayer = webgl.processPseudoLayer({
        inputs: {
            rgbfp_image: rgbfp_image,
        },
        shader: rgbPercentageFilteringShader,
        variables: {
            rgbfp_filter: rgbfp_filter,
            rgbfp_removed: rgbfp_removed,
        },
        dynamics: {
            rgbfpd1_colour: rgbfpd1_colour,
            rgbfpd2_keep: rgbfpd2_keep,
        }
    })
    return pseudolayer;
}