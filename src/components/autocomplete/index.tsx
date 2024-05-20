// import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AcAutoComplateItem } from "./types";
import { CircularProgress } from "@mui/material";
import React from "react";
import { sleep } from "@/utils/sleep";

export default function AcAutocomplete({ options }: { options: AcAutoComplateItem[] }) {
  const [open, setOpen] = React.useState(false);
  const [localOptions, setLocalOptions] =
    React.useState<readonly AcAutoComplateItem[]>([]);
  const loading = open && options.length === 0;
    
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(13); // For demo purposes.

      if (active) {
        setLocalOptions([...options]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setLocalOptions([]);
    }
  }, [open]);


  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}