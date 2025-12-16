import {
    Box,
    Grid,
    Paper,
    Avatar,
    Typography,
    TextField,
    Button,
    Divider
} from "@mui/material";
import { useState } from "preact/hooks";

export default function Profile() {
    const [user, setUser] = useState({
        firstName: "Bastien",
        lastName: "Guiguen",
        email: "bastien.guiguen@example.com",
        avatarUrl: "https://i.pravatar.cc/300"
    });

    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const handleUserChange = (field: string, value: string) => {
        setUser(prev => ({ ...prev, [field]: value }));
    };

    const handlePasswordChange = (field: string, value: string) => {
        setPasswords(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = () => {
        console.log("Profile saved (fake):", user);
    };

    const handleChangePassword = () => {
        console.log("Password change (fake):", passwords);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {/* LEFT COLUMN */}
                <Grid size={{ xs: 12, md: 8 }} order={{ xs: 2, md: 1 }}>
                    {/* Profile info */}
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Informations du profil
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Prénom"
                                    value={user.firstName}
                                    onChange={e =>
                                        handleUserChange("firstName", e.currentTarget.value)
                                    }
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    value={user.lastName}
                                    onChange={e =>
                                        handleUserChange("lastName", e.currentTarget.value)
                                    }
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Adresse email"
                                    value={user.email}
                                    onChange={e =>
                                        handleUserChange("email", e.currentTarget.value)
                                    }
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 2, textAlign: "right" }}>
                            <Button variant="contained" onClick={handleSaveProfile}>
                                Enregistrer
                            </Button>
                        </Box>
                    </Paper>

                    {/* Password */}
                    <Paper sx={{ p: 2, mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Changer le mot de passe
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Mot de passe actuel"
                                    value={passwords.current}
                                    onChange={e =>
                                        handlePasswordChange("current", e.currentTarget.value)
                                    }
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Nouveau mot de passe"
                                    value={passwords.new}
                                    onChange={e =>
                                        handlePasswordChange("new", e.currentTarget.value)
                                    }
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Confirmation"
                                    value={passwords.confirm}
                                    onChange={e =>
                                        handlePasswordChange("confirm", e.currentTarget.value)
                                    }
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 2, textAlign: "right" }}>
                            <Button variant="outlined" onClick={handleChangePassword}>
                                Modifier le mot de passe
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* RIGHT COLUMN */}
                <Grid size={{ xs: 12, md: 4 }} order={{ xs: 1, md: 2 }}>
                    <Paper sx={{ p: 2, textAlign: "center" }}>
                        <Avatar
                            src={user.avatarUrl}
                            sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
                        />
                        <Typography variant="h6">
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.email}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Button variant="outlined" fullWidth>
                            Changer l’avatar
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
