import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Tree, TreeNode } from 'react-organizational-chart'
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Demo } from './newComponent';

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`

function parse(arr, id, item) {
    return arr.map((obj) => {
        Object.keys(obj).forEach((key) => {
            if (Array.isArray(obj[key])) {
                parse(obj[key], id, item);
            }
            if (obj.code === id && obj.fields_shows) {
                // console.log('obj', obj)
                if(obj.answer) {
                    obj.answer.push(item);
                    // return
                } else {
                    obj.question_next.answer.push(item)
                }
                // obj.children.push(item);
                // obj.answer.push(item);
                // return obj
            }
        });

        return obj;
    });
}

const data = [
    {
        id: '1',
        name: 'Sub-roots',
        type: "question",
        children: [
            {
                id: '11',
                name: 'Child 1',
                type: "answer",
                children: [
                    {
                        id: '111',
                        name: 'Grand Child',
                        type: "question",
                        children: [],
                    },
                ],
            },
            {
                id: '12',
                name: 'Child 2',
                type: "answer",
                children: [
                    {
                        id: '121',
                        name: 'Gran Children 1',
                        type: "question",
                        children: [
                            {
                                id: '1211',
                                name: 'hiland',
                                type: "answer",
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: '13',
                name: 'Child 3',
                type: "answer",
                children: [],
            },
            {
                id: '14',
                name: 'Child 3',
                type: "answer",
                children: [],
            },
            {
                id: '15',
                name: 'Child 3',
                type: "answer",
                children: [],
            },
            {
                id: '16',
                name: 'Child 3',
                type: "answer",
                children: [],
            },
        ],
    },
];

interface IBigComponent {
    node: any,
    click: (id: string) => void
}


const LeafNode = ({ node, click }: IBigComponent) => {

    // console.log('node', node)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [state, setState] = React.useState<number>(0);

    const [collapse, setCollapse] = React.useState<boolean>(false);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setState(id)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (id: string) => {
        setAnchorEl(null);
        click(id)
    };

    // const handleClick = (id: string) => {
    //     click(id)
    // };

    // if(!anchorEl) {
    //     return null
    // }

    // console.log(first)

    // console.log('!node.question_next && !node.answer && !node.answers', node)

    // if(!node[0].question_next && !node[0].answer && !node[0].answers) {
    //     return null
    // }

    return (
        node?.map((it, index) => (
            <TreeNode
                key={index}
                label={
                    <StyledNode>
                        <div>
                            {it.name}
                        </div>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, it.code)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem onClick={() => handleClose(state)}>
                                add
                            </MenuItem>
                        </Menu>
                        <button onClick={() => setCollapse(!collapse)}>collapse</button>
                    </StyledNode>
                }
            >
                {(!it.answer?.length && !it.question_next) ? null : <>
                    {/* {console.log('it?.answer', it?.answer)} */}
                    {/* {console.log('it.question_next', it.question_next)} */}
                    {/* {(it?.answers && it?.answers.length) ? <LeafNode node={it?.answers} click={click} /> : null} */}
                    {it.answer?.length ? <LeafNode node={it?.answer} click={click} /> : null}
                    {it.question_next ? <LeafNode node={it.question_next.answer} click={click} /> : null}
                    {/* {console.log('it.question_next', it.question_next)} */}
                    {/* {it?.question_next.answers && <LeafNode node={it?.question_next.answers} click={click} />} */}
                    {/* <LeafNode node={it?.children} click={click} /> */}
                    {/* {it?.children.length ? <LeafNode node={it?.children} click={click} /> : null} */}
                    {/* {(() => {
                return genderTree(it?.children, click)
            })()} */}
                </>}
            </TreeNode>
        )
        ))
}

export const StyledTreeExample = () => {
    return (
        <Demo />
    )
}
// const data = [
//     {
//         id: '1',
//         name: 'Sub-roots',
//         children: [
//             {
//                 id: '11',
//                 name: 'Child 1',
//                 children: [
//                     {
//                         id: '111',
//                         name: 'Grand Child',
//                         children: []
//                     }
//                 ]
//             },
//             {
//                 id: '12',
//                 name: 'Child 2',
//                 children: [
//                     {
//                         id: '121',
//                         name: 'Gran Children 1',
//                         children: [
//                             {
//                                 id: '1211',
//                                 name: 'hiland',
//                                 children: []
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 id: '13',
//                 name: 'Child 3',
//                 children: []
//             },
//             {
//                 id: '13',
//                 name: 'Child 3',
//                 children: []
//             },
//             {
//                 id: '13',
//                 name: 'Child 3',
//                 children: []
//             },
//             {
//                 id: '13',
//                 name: 'Child 3',
//                 children: []
//             }
//         ]
//     }
// ]

