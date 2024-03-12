import axios from 'axios';
import { useEffect, useState } from "react";

export default function AllNotes() {
    const [notes, setNotes] = useState('');

    useEffect(() => {
        axios.get(`http://hyeumine.com/notesposted.php`)
        .then((res) => {
            setNotes(res.data);
        });
    }, []);

    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    }

    return (
        <div>
            <h1>All Notes</h1>
            <div dangerouslySetInnerHTML={createMarkup(notes)} />
        </div>
    );
};