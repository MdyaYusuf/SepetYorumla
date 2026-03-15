import React, { useEffect, useState, useRef } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, IconButton, Stack, Grid, Divider,
  FormControl, InputLabel, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { CreateProductInBasketDto } from '../../models/BasketRequest';
import type { CategoryResponseDto } from '../../models/Category';
import type { BasketResponseDto } from '../../models/Basket';
import { BasketService } from '../../api/basketService';
import { CategoryService } from '../../api/categoryService';
import { toast } from 'react-toastify';

interface ProductFormState extends CreateProductInBasketDto {
  id?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: BasketResponseDto | null;
}

const ShareBasketModal: React.FC<Props> = ({ open, onClose, editData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState<ProductFormState[]>([]);
  const [backendCategories, setBackendCategories] = useState<CategoryResponseDto[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const initialProductState: CreateProductInBasketDto = {
    name: '',
    price: 0,
    categoryId: 0,
    storeName: '',
    brand: '',
    model: '',
    imageFile: undefined,
    description: ''
  };

  const [curProduct, setCurProduct] = useState<CreateProductInBasketDto>(initialProductState);

  useEffect(() => {

    if (open) {
      CategoryService.getAll().then(res => {
        setBackendCategories(res.data);

        if (res.data.length > 0) {

          if (editData && editData.products.length > 0) {
            setCurProduct(prev => ({ ...prev, categoryId: editData.products[0].categoryId }));
          } else {
            setCurProduct(prev => ({ ...prev, categoryId: res.data[0].id }));
          }
        }
      });

      if (editData) {
        setTitle(editData.title);
        setDescription(editData.description || '');

        const initialProducts: ProductFormState[] = editData.products.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          categoryId: Number(p.categoryId),
          storeName: p.storeName || '',
          brand: p.brand || '',
          model: p.model || '',
          description: p.description || '',
          imageFile: undefined
        }));
        setProducts(initialProducts);
      }
    }
  }, [open, editData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setCurProduct({ ...curProduct, imageFile: file });
    }
  };

  const addProduct = () => {

    if (products.length >= 4) {
      toast.warn("Bir sepet en fazla 4 ürün içermelidir.");

      return;
    }

    if (!curProduct.name || curProduct.price <= 0 || !curProduct.imageFile) {
      toast.warn("Lütfen ürün adı, fiyat ve görsel ekleyin.");

      return;
    }
    setProducts([...products, curProduct]);
    setCurProduct({ ...initialProductState, categoryId: curProduct.categoryId });
    setSelectedFile(null);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {

    if (products.length < 2 || products.length > 4) {
      toast.error("Sepet en az 2, en fazla 4 ürün içermelidir.");

      return;
    }

    const formData = new FormData();

    if (editData?.id) {
      formData.append('id', editData.id);
    }

    formData.append('title', title);
    formData.append('description', description || '');

    products.forEach((product, index) => {

      if (product.id) {
        formData.append(`products[${index}].id`, product.id);
      }

      formData.append(`products[${index}].name`, product.name);
      formData.append(`products[${index}].price`, product.price.toString());
      formData.append(`products[${index}].categoryId`, product.categoryId.toString());
      formData.append(`products[${index}].storeName`, product.storeName || '');
      formData.append(`products[${index}].brand`, product.brand || '');
      formData.append(`products[${index}].model`, product.model || '');
      formData.append(`products[${index}].description`, product.description || '');

      if (product.imageFile) {
        formData.append(`products[${index}].imageFile`, product.imageFile);
      }
    });

    try {

      if (editData) {
        await BasketService.update(formData);

        window.location.reload();
      } else {
        await BasketService.create(formData);
      }
      resetAndClose();
    } catch (error) {
      // The axios interceptor already handles the toast notification
    }
  };

  const resetAndClose = () => {
    setTitle('');
    setDescription('');
    setProducts([]);
    setSelectedFile(null);
    setCurProduct(initialProductState);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
      slotProps={{ paper: { sx: { bgcolor: 'var(--bg-dark)', color: '#fff', borderRadius: '24px' } } }}>
      <DialogTitle sx={{ fontWeight: 800, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {editData ? 'Sepeti Düzenle' : 'Yeni Sepet Paylaş'}
        <IconButton onClick={onClose} sx={{ color: 'var(--text-muted)' }}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField fullWidth label="Sepet Başlığı" variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField fullWidth multiline rows={2} label="Sepet Açıklaması" variant="filled" value={description} onChange={(e) => setDescription(e.target.value)} />

          <Divider sx={{ borderColor: 'var(--border-dark)', my: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(13, 166, 242, 0.05)', p: 1.5, borderRadius: '12px', border: '1px solid rgba(13, 166, 242, 0.2)' }}>
            <InfoOutlinedIcon sx={{ color: 'var(--primary)', fontSize: 18 }} />
            <Typography variant="caption" sx={{ color: 'var(--text-white)', fontWeight: 600 }}>
              En az iki, en fazla dört ürün eklenmelidir. {editData ? 'Sadece değişen görselleri tekrar yükleyin.' : 'Her ürün için görsel zorunludur.'}
            </Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--primary)' }}>Yeni Ürün Ekle</Typography>

          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <TextField fullWidth label="Ürün Adı" variant="filled" size="small" value={curProduct.name} onChange={(e) => setCurProduct({ ...curProduct, name: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth size="small" variant="filled">
                <InputLabel>Kategori</InputLabel>
                <Select value={backendCategories.length > 0 ? curProduct.categoryId : ''} onChange={(e) => setCurProduct({ ...curProduct, categoryId: Number(e.target.value) })}>
                  {backendCategories.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 8 }}>
              <TextField fullWidth type="number" label="Fiyat (TL)" variant="filled" size="small" value={curProduct.price || ''} onChange={(e) => setCurProduct({ ...curProduct, price: Number(e.target.value) })} />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<PhotoCameraIcon />}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  height: '48px',
                  borderRadius: '12px',
                  borderStyle: 'dashed',
                  color: selectedFile ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  borderColor: selectedFile ? 'var(--primary)' : 'rgba(255,255,255,0.2)'
                }}
              >
                {selectedFile ? 'Seçildi' : 'Görsel *'}
              </Button>
              <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Accordion sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', boxShadow: 'none', borderRadius: '12px !important' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'var(--text-muted)' }} />}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Ekstra Ürün Detayları (Opsiyonel)</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 1 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <TextField fullWidth label="Marka" variant="filled" size="small" value={curProduct.brand} onChange={(e) => setCurProduct({ ...curProduct, brand: e.target.value })} />
                      <TextField fullWidth label="Model" variant="filled" size="small" value={curProduct.model} onChange={(e) => setCurProduct({ ...curProduct, model: e.target.value })} />
                    </Stack>
                    <TextField fullWidth label="Mağaza Adı" variant="filled" size="small" value={curProduct.storeName} onChange={(e) => setCurProduct({ ...curProduct, storeName: e.target.value })} />
                    <TextField fullWidth multiline rows={2} label="Ürün Açıklaması" variant="filled" size="small" value={curProduct.description} onChange={(e) => setCurProduct({ ...curProduct, description: e.target.value })} />
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                onClick={addProduct}
                sx={{ borderRadius: '12px', bgcolor: 'rgba(13, 166, 242, 0.1)', color: 'var(--primary)', fontWeight: 800, '&:hover': { bgcolor: 'rgba(13, 166, 242, 0.2)' } }}
              >
                Ürünü Listeye Ekle
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ maxHeight: 150, overflowY: 'auto', mt: 2 }}>
            {products.map((p, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', p: 1.5, mb: 1, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-dark)' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{p.name} {p.brand ? `(${p.brand})` : ''}</Typography>
                  <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                    {backendCategories.find(c => c.id === p.categoryId)?.name} • {p.price.toLocaleString('tr-TR')} TL {(p.imageFile || p.id) ? '📷' : ''}
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => removeProduct(i)} sx={{ color: '#ff4b4b' }}><DeleteIcon /></IconButton>
              </Box>
            ))}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid var(--border-dark)' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!title || products.length < 2 || products.length > 4}
          sx={{ borderRadius: '24px', px: 6, py: 1.5, fontWeight: 900, textTransform: 'none', ml: 'auto' }}
        >
          {editData ? 'Değişiklikleri Kaydet' : 'Sepeti Paylaş'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareBasketModal;