import React, { ReactElement, cloneElement, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { AcAutoComplateItem } from "./types";
import { sleep } from "@/utils/sleep";
import { Box } from "@mui/material";

const AcAutocomplete = ({
  options,
  label,
  onInputChange,
  Item,
}: {
  options: AcAutoComplateItem[];
  label: string;
  onInputChange: Function;
  Item: any;
}) => {
  const [open, setOpen] = useState(false);
  const [localOptions, setLocalOptions] = useState<AcAutoComplateItem[]>([]);
  const loading = open && options.length === 0;
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(100);

      if (active) {
        setLocalOptions([...options]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setLocalOptions([]);
    }
  }, [open]);

  useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  return (
    <Autocomplete
      options={localOptions}
      getOptionLabel={(option: any) => option.name}
      onInputChange={(event: any, newInputValue: string) => {
        setSearch(newInputValue);
        if (typeof onInputChange === "function") {
          onInputChange(event, newInputValue);
        }
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(index: number, option: AcAutoComplateItem) => (
        <Box key={index}>
          <Item option={option} search={search} />
          {/* {cloneElement(item as ReactElement<any>, { option, search })} */}
        </Box>
      )}
    />
  );
};

export default AcAutocomplete;
