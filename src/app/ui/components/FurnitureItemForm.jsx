'use client';
import { useState, useEffect } from "react";
import { useCategoriesColors } from "@/app/lib/context/CategoriesColorsContext";

import { 
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';

import LoadingButton from '@mui/lab/LoadingButton';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditOffIcon from '@mui/icons-material/EditOff';

import {
  addFurnitureItem,
  addFileToBucket,
  addImage,
  updateFurnitureItem
} from "@/app/lib/ajax";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FurnitureItemForm({
  editing = false,
  furnitureItemData,
  handleClose,
  updateItemState
}) {

  const { categories, colors } = useCategoriesColors();

  useEffect(() => {
    if (colors.length > 0 && categories.length > 0 && editing) {
      setFormData({
        name: furnitureItemData.name,
        description: furnitureItemData.description,
        colorId: furnitureItemData.color.id,
        categoryId: furnitureItemData.category.id
      });
    }
  }, [colors, categories]);

  const [sendLoading, setSendLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    colorId: '',
    categoryId: ''
  });
  const [isFormData, setIsFormData] = useState({
    name: true,
    description: true,
    colorId: true,
    categoryId: true
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [areSelectedFiles, setAreSelectedFiles] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsFormData({
      ...isFormData,
      [name]: !!value,
    });
  };

  const handleFilesChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
    setAreSelectedFiles(files.length > 0);
  };

  const addFullItem = async () => {
    const bucketUrlWrite = process.env.NEXT_PUBLIC_BUCKET_URL_WRITE;

    const newItemResult = await addFurnitureItem(formData);
    const filesArray = Array.from(selectedFiles);
    const uploadPromises = filesArray.map((file, index) => {
      const extension = file.name.split('.').pop();
      const name = `${newItemResult.id}-${index + 1}.${extension}`;
      return addFileToBucket(bucketUrlWrite, name, file)
        .then(() => addImage({
          url: name,
          furnitureItemId: newItemResult.id,
        }));
    });
    
    await Promise.all(uploadPromises);
  };

  const handleSubmit = async () => {
    const currentIsFormData = {
      name: !!formData.name,
      description: !!formData.description,
      colorId: !!formData.colorId,
      categoryId: !!formData.categoryId,
    };
    if (Object.values(currentIsFormData).some(value => !value)) {
      setIsFormData(currentIsFormData);
      return;
    }
    if (!editing && selectedFiles.length === 0) {
      setAreSelectedFiles(false);
      return;
    }

    setSendLoading(true);

    try {
      if (editing) {
        await updateFurnitureItem(furnitureItemData.id, formData);
        if (updateItemState) {
          updateItemState(
            furnitureItemData.id,
            {
              name: formData.name,
              description: formData.description,
              color: colors.find(color => color.id === formData.colorId),
              category: { id: formData.categoryId }
            }
          );
        }
        handleClose();
      }
      else
        await addFullItem();
    } catch (error) {
      console.error(error);
    } finally {
      setFormData({
        name: '',
        description: '',
        colorId: '',
        categoryId: ''
      });
      setSelectedFiles([]);
      setSendLoading(false);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        padding: 4,
        backgroundColor: 'white',
        width: editing ? '100%' : { xs: '100%', sm: '500px' },
        height: editing ? '100%' : { xs: '100%', sm: '530px'},
        borderRadius: '5px',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.4)'
      }}
    >
      <div className={`w-full h-full flex flex-col justify-center ${editing ? 'gap-10' : 'gap-8'}`}>
        <div className="flex gap-4 items-center">
          <Typography variant="h6">
            {(editing ? 'Editar' : 'Agregar') + ' mueble'}
          </Typography>
          {editing &&
            <IconButton
              onClick={handleClose}
              color="primary"
            >
              <EditOffIcon />
            </IconButton>
          }
        </div>
        <TextField
          id="name"
          name="name"
          label="Nombre"
          variant="outlined"
          value={formData.name}
          onChange={handleInputChange}
          error={!isFormData.name}
        />
        <TextField
          id="description"
          name="description"
          label="Descripción"
          multiline
          rows={2}
          value={formData.description}
          onChange={handleInputChange}
          error={!isFormData.description}
        />
        <div className="flex gap-7">
          <FormControl fullWidth>
            <InputLabel id="colorId">Color</InputLabel>
            <Select
              labelId="colorId"
              id="colorId"
              name="colorId"
              label="Color"
              value={formData.colorId}
              onChange={handleInputChange}
              error={!isFormData.colorId}
              renderValue={selected => {
                const selectedColor = colors.find(color => color.id === selected);
                return selectedColor ? selectedColor.name : '';
              }}
            >
              {colors.length > 0 && colors.map(color => (
                <MenuItem key={color.id} value={color.id} className="w-full flex gap-2 items-center">
                  <div style={{ backgroundColor: color.code }} className={`h-[25px] w-[40px] rounded-[3px] border border-black`}></div>
                  <Typography>{color.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="categoryId">Categoría</InputLabel>
            <Select
              labelId="categoryId"
              id="categoryId"
              name="categoryId"
              label="Categoría"
              value={formData.categoryId}
              onChange={handleInputChange}
              error={!isFormData.categoryId}
            >
              {categories.length > 0 && categories.map(category => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {!editing &&
          <Button
            color={areSelectedFiles ? 'primary' : 'error'}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {selectedFiles.length > 0
              ? selectedFiles.length + (selectedFiles.length === 1 ? ' archivo' : ' archivos')
              : 'Cargar archivos'
            }
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => handleFilesChange(e)}
              multiple
              />
          </Button>
        }
        <LoadingButton
          onClick={handleSubmit}
          loading={sendLoading}
          variant="contained"
        >
          Enviar
        </LoadingButton>
      </div>
    </Box>
  );
};