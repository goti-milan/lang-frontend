import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import Conjugation from './Conjugation';
import { useState } from 'react';

function UrlItem({
  term,
  deleteItem,
  url,
  setValue,
  setItemUpdated,
  item,
  setItemsList,
  itemsList,
}) {
  const [error, setError] = useState(null);

  const parseHandler = (data) => {
    const conjugation = {
      present: [
        { type: '1st singular (я)', value: '', selected: false },
        { type: '2nd singular (ты)', value: '', selected: false },
        { type: '3rd singular (он/она́/оно́)', value: '', selected: false },
        { type: '1st plural (мы)', value: '', selected: false },
        { type: '2nd plural (вы)', value: '', selected: false },
        { type: '3rd plural (они́)', value: '', selected: false },
      ],
      past: [
        { type: 'singlular masculine (я/ты/он)', value: '', selected: false },
        { type: 'plural (мы/вы/они́)', value: '', selected: false },
        { type: 'singlular feminine (я/ты/она́)', value: '', selected: false },
        { type: 'singlular neuter (оно́)', value: '', selected: false },
      ],
      future: [
        { type: '1st singular (я)', value: '', selected: false },
        { type: '2nd singular (ты)', value: '', selected: false },
        { type: '3rd singular (он/она́/оно́)', value: '', selected: false },
        { type: '1st plural (мы)', value: '', selected: false },
        { type: '2nd plural (вы)', value: '', selected: false },
        { type: '3rd plural (они́)', value: '', selected: false },
      ],
    };
    const section = data?.sections?.find(
      (section) => section.line === 'Conjugation'
    );
    if (!section) return setError('Conjugation for this term does not exist!');

    let html = data.text['*'];

    const index = html.indexOf('future tense');

    let endIndex = html.indexOf('id="Derived_terms">');

    const preReform = html.indexOf('Pre-reform conjugation of');
    const etymology2 = html.indexOf('id="Etymology_2"');
    if (preReform > 0) endIndex = preReform;
    if (etymology2 > 0) endIndex = etymology2;

    html = html.slice(index, endIndex);

    const td = [...html.matchAll(/(?<=<td)(.*)(?=)/g)]
      .map((el) => el[0])
      .map((el) => el.slice(el.indexOf('</a>') - 30))
      .map((el) => el.slice(el.indexOf('">') + 2))
      .map((el) => {
        if (el.indexOf('class="Cyrl"') > 0)
          return (
            el.slice(0, el.indexOf('</a>')) +
            ' ' +
            el.slice(el.indexOf('">') + 3, el.indexOf('</span><br'))
          );

        return el.slice(0, el.indexOf('</a>'));
      });
    td.splice(12, 2);

    const future = [];
    const present = [];
    const past = [];

    for (let i = 0; i < 12; i++) {
      if (i % 2 === 0) present.push(td[i]);
      else future.push(td[i]);
    }

    for (let i = 12; i < 16; i++) past.push(td[i]);

    present.forEach((el, i) => (conjugation.present[i].value = el));
    future.forEach((el, i) => (conjugation.future[i].value = el));
    past.forEach((el, i) => (conjugation.past[i].value = el));

    const listObj = [...itemsList];
    const itemIndex = listObj.findIndex((el) => el.index === item.index);
    listObj[itemIndex].conjugation = conjugation;

    setError(null);
    setItemsList(listObj);
    setItemUpdated(true);
  };

  const termHandler = () => {
    axios
      .get(
        `https://en.wiktionary.org/w/api.php?action=parse&format=json&page=${term}&origin=*`
      )
      .then((res) => {
        if (!res?.data?.parse)
          setError('Data from this page could not be parsed!');

        parseHandler(res.data.parse);
      })
      .catch((err) => setError(err));
  };
  const urlHandler = () => {
    const decodedUrl = String(decodeURIComponent(url));
    const parsedUrl = decodedUrl.slice(
      decodedUrl.indexOf('wiki/') + 5,
      decodedUrl.indexOf('#')
    );

    axios
      .get(
        `https://en.wiktionary.org/w/api.php?action=parse&format=json&page=${parsedUrl}&origin=*`
      )
      .then((res) => {
        if (!res?.data?.parse)
          setError('Data from this page could not be parsed!');

        parseHandler(res.data.parse);
      })
      .catch((err) => setError(err));
  };

  const updateItems = (el, value, tense, type = 'value') => {
    const listObj = [...itemsList];
    const itemIndex = listObj.findIndex(
      (element) => element.index === item.index
    );
    const conjIndex = listObj[itemIndex].conjugation[tense].findIndex(
      (element) => element.type === el.type
    );
    listObj[itemIndex].conjugation[tense][conjIndex][type] = value;

    setError(null);
    setItemsList(listObj);
    setItemUpdated(true);
  };

  return (
    <Stack
      direction='column'
      className='textinput'
      style={{
        margin: "10px 0",
        backgroundColor: '#f7f7f7',
        padding: '1rem 5%',
      }}
    >
      <Stack
        direction='row'
        alignItems='center'
        spacing={5}
        justifyContent='space-between'
      >
        <Stack direction='column' alignItems='center' gap={2}>
          <TextField
            id='term'
            name='term'
            label='Term'
            variant='outlined'
            onChange={(e) => {
              setValue(e.target.value, 'term');
              if (url) setValue('', 'url');
            }}
            value={term}
          />
          <Button
            variant='contained'
            disabled={term ? false : true}
            onClick={termHandler}
          >
            Load term
          </Button>
        </Stack>
        <Stack direction='column' alignItems='center' gap={2}>
          <TextField
            id='url'
            name='url'
            label='URL'
            variant='outlined'
            onChange={(e) => {
              setValue(e.target.value, 'url');
              if (term) setValue('', 'term');
            }}
            value={url}
          />
          <Button
            variant='contained'
            disabled={url ? false : true}
            onClick={urlHandler}
          >
            Load from url
          </Button>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={5}>
          <IconButton
            aria-label='delete item'
            color='error'
            sx={{ p: 1, backgroundColor: '#ececec' }}
            onClick={deleteItem}
          >
            <ClearIcon />
          </IconButton>
        </Stack>
      </Stack>
      {error && (
        <Typography variant='p' color='red' textAlign='center' sx={{ mt: 3 }}>
          {error}
        </Typography>
      )}
      {item?.conjugation && !error && (
        <Conjugation
          updateItems={updateItems}
          conjugation={item.conjugation}
          setItemUpdated={setItemUpdated}
        />
      )}
    </Stack>
  );
}

export default UrlItem;
