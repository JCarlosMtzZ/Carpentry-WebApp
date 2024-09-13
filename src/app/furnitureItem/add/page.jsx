'use client';
import { useState, useEffect } from "react";

import { 
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { getAllCategories, getAllColors, addFurnitureItem, addFileToBucket, addImage } from "@/app/lib/ajax";

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

export default function Page() {

  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colorsResult = await getAllColors();
        const categoriesResult = await getAllCategories();
        setColors(colorsResult);
        setCategories(categoriesResult);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);


  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async () => {

    const currentIsFormData = {
      name: !!formData.name,
      description: !!formData.description,
      colorId: !!formData.colorId,
      categoryId: !!formData.categoryId,
    };
    
    if (Object.values(currentIsFormData).some(value => !value) || selectedFiles.length === 0) {
      setIsFormData(currentIsFormData);
      setAreSelectedFiles(selectedFiles.length > 0);
      return;
    }

    setLoading(true);

    try {
      const newItemResult = await addFurnitureItem(formData);

      const filesArray = Array.from(selectedFiles);

      const uploadPromises = filesArray.map((file, index) => {
        const extension = file.name.split('.').pop();
        const name = `${newItemResult.id}-${index + 1}.${extension}`;
      
        return addFileToBucket(process.env.NEXT_PUBLIC_BUCKET_API_URL, name, file)
          .then(() => addImage({
            url: name,
            furnitureItemId: newItemResult.id,
          }));
      });
      
      await Promise.all(uploadPromises);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center sm:p-8 w-full h-full bg-[#003055]/5">
      <Box
        component='form'
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 4,
          backgroundColor: 'white',
          width: { xs: '100%', sm: '500px' },
          height: { xs: '100%', sm: '530px'},
          borderRadius: '5px',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Typography variant="h6">
          Agregar mueble
        </Typography>
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
            >
              {colors && colors.map(color => (
                <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
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
              {categories && categories.map(category => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
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
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          variant="contained"
        >
          Enviar
        </LoadingButton>
      </Box>
    </div>
  );
};