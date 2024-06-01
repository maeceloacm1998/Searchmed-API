// import HospitalSchema from "@models/schema/HospitalSchema";
// import { StatusCode } from "@models/types/status.code";
// import { getHospitals, placeHospitalDetails } from "@services/places.service";

// Serve de exemplo para atualizações no banco de dados
// async function placeGetHospitalsInGoogleMapsController(
//   req: Request,
//   res: Response
// ) {
//   const hospitalsList = await getHospitals();

//   switch (hospitalsList.status) {
//     case StatusCode.Success: {
//       hospitalsList.result.map(async (hospital) => {
//         const details = await placeHospitalDetails(hospital.place_id);

//         const reviews = details.result.reviews
//           ? details.result.reviews.map((review) => ({
//               author: review.author_name,
//               authorUrl: review.author_url,
//               photo: review.profile_photo_url,
//               rating: review.rating,
//               comment: review.text,
//               date: new Date(Number(review.time) * 1000), // Convertendo timestamp Unix para Date
//             }))
//           : [];

//         const hospitalData = {
//           // Preencha tudo com o que vem do details
//           place_id: details.result.place_id,
//           address: details.result.formatted_address,
//           geometry: details.result.geometry,
//           name: details.result.name,
//           rating: details.result.rating,
//           distance: hospital.distance,
//           isEmergencyHospital: hospital.isEmergencyHospital,
//           phoneNumber: details.result.formatted_phone_number || "",
//           reviews: reviews,
//         };

//         // Verifique se o hospital já existe
//         const existingHospital = await HospitalSchema.findOne({
//           place_id: hospital.place_id,
//         });

//         if (existingHospital) {
//           // Atualize o hospital existente
//           await HospitalSchema.updateOne(
//             { place_id: hospital.place_id },
//             { $set: hospitalData }
//           );
//           console.log(
//             `Hospital com place_id ${hospital.place_id} atualizado com sucesso!`
//           );
//         } else {
//           // Crie um novo hospital
//           const newHospital = new HospitalSchema(hospitalData);
//           await newHospital.save();
//           console.log(
//             `Hospital com place_id ${hospital.place_id} salvo com sucesso!`
//           );
//         }
//       });

//       break;
//     }

//     case StatusCode.notFound: {
//     }
//   }
// }

// export { placeGetHospitalsInGoogleMapsController };
