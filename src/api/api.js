import axios from "axios";

const ip = "10.235.186.68:8088";

const api = `http://${ip}`;

const getGoods = async (params = {}) => {
  try {
    const response = await axios.get(`${api}/search/q`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching goods:", error);
    return [];
  }
};

const getShopItems = async (params = {}) => {
  try {
    const response = await axios.get(`${api}/shops/${params.shopId}/items`, {
      params: params,
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching shop items:", err);
    return [];
  }
};

const GENDERS = {
  male: 1,
  female: 0,
  diverse: 3,
};

const mapGetGoodsRequestParams = (searchFilter, radius, userPosition) => {
  if (!userPosition || userPosition.length < 2) {
    throw new Error("User position is required");
  }

  return {
    title: searchFilter.title || undefined,
    priceFrom: searchFilter.minPrice
      ? Number(searchFilter.minPrice)
      : undefined,
    priceTo: searchFilter.maxPrice ? Number(searchFilter.maxPrice) : undefined,
    size: searchFilter.size || undefined,
    color: searchFilter.color || undefined,
    sex: searchFilter.gender ? GENDERS[searchFilter.gender] : undefined,
    userLat: userPosition[0],
    userLon: userPosition[1],
    radius: radius ?? undefined,
  };
};

const mapGetShopItemsRequestParams = (
  searchFilter,
  shopId,
  radius,
  userPosition,
  page = 0,
  sizePerPage = 10
) => {
  if (!userPosition || userPosition.length < 2) {
    throw new Error("User position is required");
  }

  if (shopId === null || shopId === undefined) {
    throw new Error("Shop id is required");
  }

  return {
    shopId: shopId,
    title: searchFilter.title || undefined,
    priceFrom: searchFilter.minPrice
      ? Number(searchFilter.minPrice)
      : undefined,
    priceTo: searchFilter.maxPrice ? Number(searchFilter.maxPrice) : undefined,
    size: searchFilter.size || undefined,
    color: searchFilter.color || undefined,
    sex: searchFilter.gender ? GENDERS[searchFilter.gender] : undefined,
    userLat: userPosition[0],
    userLon: userPosition[1],
    radius: radius ?? undefined,
    page: page,
    sizePerPage: sizePerPage,
  };
};

const getGoodsRequest = async (
  searchFilter,
  radius,
  userPosition,
  setShopsWithBranches
) => {
  try {
    const data = await getGoods(
      mapGetGoodsRequestParams(searchFilter, radius, userPosition)
    );

    const shopsWithBranches = data.map((shop) => ({
      id: shop.id,
      title: shop.title,
      minPrice: shop.minPrice,
      maxPrice: shop.maxPrice,
      medianPrice: shop.medianPrice,
      branches: shop.branches,
    }));

    setShopsWithBranches(shopsWithBranches);

    console.log("Shops with branches saved:", shopsWithBranches);
  } catch (err) {
    console.error(err);
  }
};

export { getGoodsRequest };
