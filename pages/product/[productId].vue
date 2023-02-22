<template>
  <v-container v-if="product">
    <!-- Save Product -->
    <ButtonFloating
      icon="mdi-content-save"
      :on-click="saveProduct"
    ></ButtonFloating>
    <!-- Content -->
    <v-card :title="product?.name || 'Create new product'">
      <v-card-text>
        <!-- Name -->
        <v-text-field
          v-model="product.name"
          label="Name"
          type="text"
          variant="outlined"
        ></v-text-field>
        <!-- Description -->
        <v-textarea
          v-model="product.description"
          label="Description"
          type="text"
          variant="outlined"
        ></v-textarea>
        <!-- Image -->
        <v-row align="center" class="pa-3">
          <v-img
            :src="
              selectedImageUrl ||
              product?.image ||
              'https://via.placeholder.com/150'
            "
            class="me-4"
            width="auto"
            height="256"
          ></v-img>
          <v-file-input
            v-model="imageField"
            accept="image/*"
            label="Select an image"
          ></v-file-input>
        </v-row>
        <!-- Product Variants -->
        <div class="text-h6 mb-4">Variants</div>
        <v-row
          v-for="variant in product?.variants"
          align="center"
          :class="{
            'bg-amber-accent-1': !variant.id,
          }"
        >
          <v-col cols="10">
            <v-row>
              <!-- Color -->
              <v-col cols="3">
                <v-text-field
                  v-model="variant.color"
                  label="Color"
                  type="text"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <!-- Size -->
              <v-col cols="3">
                <v-text-field
                  v-model="variant.size"
                  label="Size"
                  type="text"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <!-- Price -->
              <v-col cols="3">
                <v-text-field
                  v-model="variant.price"
                  label="Price"
                  type="number"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <!-- Available -->
              <v-col cols="3">
                <v-text-field
                  v-model="variant.stocks"
                  label="Available"
                  type="number"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <!-- Actions -->
          <v-col cols="2">
            <v-row class="mb-4" justify="center">
              <v-btn
                class="me-3"
                icon="mdi-content-save"
                color="info"
                @click="saveVariant(variant)"
              >
              </v-btn>
              <v-btn
                icon="mdi-delete"
                color="error"
                @click="deleteVariant(variant?.id)"
              >
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <!-- Create new variant -->
        <v-btn
          :class="{
            'mt-7': product.variants!.length > 0,
          }"
          color="primary"
          prepend-icon="mdi-plus-circle"
          @click="createNewVariant"
        >
          New variant
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { NotifyType } from '@/shared/enums';
import { ProductVariant } from '@/shared/interfaces/response/ProductVariant';

useHead({
  title: 'Product Detail',
});

const route = useRoute();
const productStore = useProductStore();
const productVariantStore = useProductVariantStore();
const imageField = ref<File[]>();

onMounted(async () => {
  if (productId.value === null) {
    productStore.product = {
      name: '',
      description: '',
      image: '',
      variants: [],
      stocks: 0,
      price_range: [0, 0],
    };
    return;
  }
  await productStore.fetchProduct(productId.value);
});

const productId = computed(() => {
  return parseInt(route.params.productId as string) || null;
});

const product = computed(() => {
  return productStore.product;
});

const selectedImage = computed(() => {
  if (!imageField.value || imageField.value.length === 0) return null;
  return imageField.value![0];
});

const selectedImageUrl = computed(() => {
  if (!selectedImage.value) return null;
  return URL.createObjectURL(selectedImage.value);
});

const createNewVariant = () => {
  if (productStore.product.variants?.find((variant) => !variant.id)) return;
  productStore.product.variants!.push({
    color: '',
    size: '',
    stocks: 0,
    price: 0,
  });
};

const saveProduct = async () => {
  if (!productId.value) {
    await productStore.createProduct({
      ...product.value,
      image: imageField.value![0].toString(),
    });
  } else {
    await productStore.updateProduct(productId.value, {
      ...product.value,
      image: selectedImage.value ? selectedImage.value.toString() : undefined,
    });
  }
};

const saveVariant = async (variant: ProductVariant) => {
  if (!productId) {
    return showSnackbar(NotifyType.ERROR, 'Please save product first');
  }
  if (!variant.id) {
    await productVariantStore.createVariant({
      ...variant,
      product: productId.value!,
    });
  } else {
    await productVariantStore.updateVariant(variant.id, variant);
  }
};

const deleteVariant = async (variantId?: number) => {
  if (!variantId) {
    return useRemove(productStore.product.variants!, (variant) => !variant.id);
  }
  showDialog(
    NotifyType.ERROR,
    'Delete Variant',
    'Are you sure?',
    'DELETE',
    () => productVariantStore.deleteVariant(variantId),
  );
};
</script>

<style lang="scss" scoped></style>
