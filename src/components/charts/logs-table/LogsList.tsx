import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const logs = [
    { time: "2025-12-16 10:00:00", message: "Server started successfully" },
    { time: "2025-12-16 10:05:00", message: "User login: admin" },
    { time: "2025-12-16 10:10:00", message: "Database connection established" },
    { time: "2025-12-16 10:15:00", message: "Error: Invalid request from IP 192.168.1.1" },
    { time: "2025-12-16 10:20:00", message: "Backup completed" }
];

export default function LogsList() {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Logs Récentes</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 200, overflow: 'auto' }}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log, index) => (
                            <TableRow key={index}>
                                <TableCell>{log.time}</TableCell>
                                <TableCell>{log.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}