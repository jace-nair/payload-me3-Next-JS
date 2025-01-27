import CoverBlockServer from "@/blocks/cover/Server";
import { Page } from "@/payload-types";
import React, { Fragment } from 'react';


/* Map block slugs to actual block components */
const blockComponents: { [key: string]: React.ComponentType<any> } = {
    cover: CoverBlockServer
};

/*This component goes through the page layout and for every block in the page layout
it check whether it has a block, is the block in the block component and then assigns
the "Block" variable to the actual react component and then return the react component 
and it will give all the props it receives from the payload CMS backend*/
export const RenderBlocks: React.FC<{
    blocks: Page['layout'][0][]
}> = (props) => {
    
    const { blocks } = props;

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

    if (hasBlocks) {
        return(
            <Fragment>
                {blocks.map((block, index) => {
                    const {blockName, blockType} = block;

                    if(blockType && blockType in blockComponents) {
                        const Block = blockComponents[blockType];

                        if(Block) {
                            return(
                                <div className="my-16" key={index}>
                                    <Block id={blockName} {...block} />
                                </div>
                            );
                        }
                    }
                })}
            </Fragment>
        )
    }

    return null
}