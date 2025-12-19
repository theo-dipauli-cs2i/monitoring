import { Box, Paper, Typography, useTheme, Tooltip } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import RouterIcon from '@mui/icons-material/Router';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';

import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';

// Types
import networkData from '../../data/networkMap.json';

// Initial Data
// Types
interface Node {
    id: string;
    type: string;
    label: string;
    x: number;
    y: number;
    status: string;
}

interface Link {
    id: string;
    source: string;
    target: string;
    status: string;
}

const getNodeIcon = (type: string) => {
    switch (type) {
        case 'client':
            return <LaptopMacIcon />;
        case 'lb':
            return <RouterIcon />;
        case 'app':
            return <CloudQueueIcon />;
        case 'db':
            return <StorageIcon />;
        case 'cache':
            return <StorageIcon sx={{ transform: 'rotate(90deg)' }} />;
        default:
            return <CloudQueueIcon />;
    }
};

const getNodeColor = (status: string, theme: any) => {
    switch (status) {
        case 'up':
            return theme.palette.success.main;
        case 'down':
            return theme.palette.error.main;
        case 'warning':
            return theme.palette.warning.main;
        default:
            return theme.palette.text.secondary;
    }
};

const getLinkColor = (status: string, theme: any) => {
    switch (status) {
        case 'active':
            return theme.palette.success.light;
        case 'down':
            return theme.palette.error.light;
        case 'latency':
            return theme.palette.warning.light;
        default:
            return theme.palette.grey[500];
    }
};

export default function NetworkMap() {
    const theme = useTheme();
    const [nodes] = useState<Node[]>(networkData.nodes);
    const [links, setLinks] = useState<Link[]>(networkData.links);

    // Helper to toggle link status
    const toggleLink = (id: string) => {
        setLinks((prev) =>
            prev.map((l) => {
                if (l.id === id) {
                    const newStatus = l.status === 'active' ? 'down' : 'active';
                    return { ...l, status: newStatus };
                }
                return l;
            })
        );
    };

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                borderRadius: 4,
                height: 400,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Typography variant='h6' gutterBottom fontWeight='bold'>
                Topologie Réseau Interactive
            </Typography>

            {/* Container for the map */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: 'calc(100% - 40px)',
                    backgroundColor:
                        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : '#f5f5f7',
                    borderRadius: 2,
                }}
            >
                {/* SVG Layer for Links */}
                <svg
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                    }}
                >
                    <defs>
                        <marker
                            id='arrowhead'
                            markerWidth='10'
                            markerHeight='7'
                            refX='28'
                            refY='3.5'
                            orient='auto'
                        >
                            <polygon
                                points='0 0, 10 3.5, 0 7'
                                fill={theme.palette.text.disabled}
                            />
                        </marker>
                    </defs>
                    {links.map((link) => {
                        const start = nodes.find((n) => n.id === link.source);
                        const end = nodes.find((n) => n.id === link.target);
                        if (!start || !end) return null;

                        const x1 = `${start.x}%`;
                        const y1 = `${start.y}%`;
                        const x2 = `${end.x}%`;
                        const y2 = `${end.y}%`;

                        const color = getLinkColor(link.status, theme);
                        const isDown = link.status === 'down';

                        return (
                            <g
                                key={link.id}
                                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                                onClick={() => toggleLink(link.id)}
                            >
                                {/* Invisible thicker line for easier clicking */}
                                <line
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke='transparent'
                                    strokeWidth='20'
                                />
                                {/* Visible Line */}
                                <line
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke={color}
                                    strokeWidth='2'
                                    strokeDasharray={isDown ? '5,5' : 'none'}
                                    markerEnd='url(#arrowhead)'
                                />
                                {/* Status Icon on Line */}
                                {isDown && (
                                    <foreignObject
                                        x={(start.x + end.x) / 2 - 2 + '%'}
                                        y={(start.y + end.y) / 2 - 2 + '%'}
                                        width='4%'
                                        height='8%'
                                    >
                                        <CancelIcon
                                            sx={{
                                                color: 'error.main',
                                                fontSize: 20,
                                                bgcolor: 'background.paper',
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </foreignObject>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* HTML Layer for Nodes */}
                {nodes.map((node) => (
                    <Tooltip
                        key={node.id}
                        title={`${node.label} (${node.status.toUpperCase()})`}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                left: `${node.x}%`,
                                top: `${node.y}%`,
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                zIndex: 2,
                                cursor: 'pointer',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    bgcolor: 'background.paper',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: 3,
                                    border: `3px solid ${getNodeColor(node.status, theme)}`,
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'scale(1.1)' },
                                }}
                            >
                                {getNodeIcon(node.type)}
                            </Box>
                            <Typography
                                variant='caption'
                                fontWeight='bold'
                                sx={{
                                    mt: 1,
                                    px: 1,
                                    bgcolor: 'background.paper',
                                    borderRadius: 1,
                                    boxShadow: 1,
                                }}
                            >
                                {node.label}
                            </Typography>
                        </Box>
                    </Tooltip>
                ))}
            </Box>
        </Paper>
    );
}
