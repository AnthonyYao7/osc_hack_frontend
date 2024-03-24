'use client'

import AuthenticatedPage from "../../../components/AuthenticatedPage";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';


export default function Page() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // @ts-ignore
    if (data.get('club') == null || (data.get('club').toString().length == 0)) {
      setClubNameTooShort(true);
      return;
    }

    let resp = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + '/clubs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          club_name: data.get('club'),
        }),
      });

    if (resp.ok) {
      router.push('/');
    } else {
      setInvalidInput(true);
    }
  }

  const [clubNameTooShort, setClubNameTooShort] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const router = useRouter();

  interface Club {
    club_name: string;
    club_id: string;
  }

  const [clubs, setClubs] = useState<Club[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined, clubID: string) => {
    console.log(clubID);

    fetch(
      process.env.NEXT_PUBLIC_BACKEND_HOSTNAME  + '/clubs/' + clubID + '/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(r => {
      alert("You sent a request to join the club");
    })
  }

  useEffect(() => {
    console.log("hgi");

    fetch(process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + '/clubs', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    }).then(async (r) => {
      if (!r.ok) {
        console.log("We are fucked");
        return;
      }

      let _clubs = (await r.json())['clubs'];
      console.log(_clubs);
      setClubs(_clubs);
    })
  }, []);

  return (
    <AuthenticatedPage>
      <Box sx={{
        width: '400px', // Adjust width as needed
        margin: 'auto', // Centers the box
        p: 2, // Adds padding inside the box (optional)
        border: '1px solid #ccc', // Adds a border for visual clarity (optional)
        mt: 5, // Adds margin top for spacing from the top
      }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 0 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ py: 1, px: 2 }}>Join?</TableCell>
                <TableCell align="right" sx={{ py: 1, px: 2 }}>Club name</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clubs.map((club) => (
                <TableRow
                  key={club.club_name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ py: 1, px: 2 }}>
                    <Button variant="contained" endIcon={<SendIcon />}
                      onClick={function (...args) {
                        return handleClick(...args, club.club_id);
                      }}>
                      Send
                    </Button>
                  </TableCell>
                  <TableCell align="right" component="th" scope="row" sx={{ py: 1, px: 2 }}>
                    {club.club_name}
                  </TableCell>
                  {/*<TableCell align="right">{row.calories}</TableCell>*/}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </AuthenticatedPage>
  )
}